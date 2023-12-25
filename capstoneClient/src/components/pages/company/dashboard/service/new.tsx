import * as React from "react";

import Typography from "@/components/core/typography";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/forms/form";
import { Input } from "@/components/forms/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { nextAPIUrl } from "@/constant/env";
import { toast } from "react-toastify";
import axios from "axios";
import { Button } from "@/components/buttons/button";
import { AiOutlineLoading } from "react-icons/ai";

const NewService = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //----- # Start Region Submit Form # -----//
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const jenisLayanan = data.jenisLayanan;
    const harga = data.harga;
    const pelabuhan = data.pelabuhan;
    const satuanKerja = data.satuanKerja;
    try {
      axios.defaults.withCredentials = true;
      await toast.promise(
        axios.post(
          `${nextAPIUrl}/layanan/company/createLayanan`,
          { jenisLayanan, harga, pelabuhan, satuanKerja, id },
          {
            withCredentials: true,
          }
        ),
        {
          pending: "Creating new service..",
          success: "Successfully created new service!",
          error: "Failed to create new service!",
        }
      );
      form.reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }
  //----- # End Region Submit Form # -----//
  return (
    <main className="h-screen">
      <Typography variant="h3" color="primary" className="text-center">
        Create new Service
      </Typography>
      <section className="shadow-lg px-6 py-3 w-full rounded-md mb-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 w-full flex-col"
          >
            <FormField
              control={form.control}
              name="jenisLayanan"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Service Name
                  </Typography>
                  <FormControl>
                    <Input placeholder="Service A" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Service name must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="harga"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Service Price
                  </Typography>
                  <FormControl>
                    <Input placeholder="Rp 10.000" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Service Price must be valid.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pelabuhan"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Dock
                  </Typography>
                  <FormControl>
                    <Input placeholder="Dock A" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Dock must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="satuanKerja"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Work Force
                  </Typography>
                  <FormControl>
                    <Input placeholder="Work Force A" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Work force must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" variant="default">
              {isLoading ? (
                <AiOutlineLoading className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </section>
    </main>
  );
};
const FormSchema = z.object({
  jenisLayanan: z.string().min(1, {
    message: "Service Type must be at least 1 characters.",
  }),
  harga: z.coerce.number().min(1, {
    message: "Service price must be at least 1 characters.",
  }),
  pelabuhan: z.string().min(1, {
    message: "Service Dock must be at least 1 characters.",
  }),
  satuanKerja: z.string().min(1, {
    message: "Work force must be at least 1 characters.",
  }),
});
export default NewService;
