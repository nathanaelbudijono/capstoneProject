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
import { useAppStore } from "@/lib/store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/forms/select-input";

const BillingCompany = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    getCompanyService,
    service,
    getAllUser,
    allUsers,
    getUserBoatById,
    userBoats,
  } = useAppStore();

  React.useEffect(() => {
    getAllUser();
    getCompanyService(id);
  }, []);

  if (!allUsers) {
    return (
      <main className="h-screen flex justify-center items-center">
        <AiOutlineLoading className="animate-spin text-4xl" />
      </main>
    );
  }

  const handleUserChange = async (userId: string) => {
    await getUserBoatById(userId);
  };

  //----- # Start Region Submit Form # -----//
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const usersId = data.userId;
    const layananId = data.layananId;
    const dataKapalId = data.boatId;
    const duration = data.duration;
    const companyId = id;
    try {
      axios.defaults.withCredentials = true;
      await toast.promise(
        axios.post(
          `${nextAPIUrl}/billing/company/createBilling`,
          { usersId, layananId, dataKapalId, companyId, duration },
          {
            withCredentials: true,
          }
        ),
        {
          pending: "Creating new billing.",
          success: "Successfully created new billing!",
          error: "Failed to create new billing!",
        }
      );
      form.reset();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="h-screen">
      <Typography variant="h3" color="primary">
        Create Billing
      </Typography>
      <Typography variant="small" className="mt-2">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin porta
        semper mi, in elementum orci aliquet sodales. Nam eleifend eu arcu a
        egestas.
      </Typography>
      <section className="shadow-lg px-6 py-3 w-full rounded-md mb-5 mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 w-full flex-col"
          >
            <FormField
              control={form.control}
              name="layananId"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Service Name
                  </Typography>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary border bg-white text-typography-800">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {/* @ts-ignore */}
                      {service?.map((service: any) => (
                        <SelectItem key={service.id} value={service?.id}>
                          {service?.jenisLayanan}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Service name must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Service Duration
                  </Typography>
                  <FormControl>
                    <Input placeholder="1" type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Service duration must be valid.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Client
                  </Typography>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleUserChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary border bg-white text-typography-800">
                        <SelectValue placeholder="Select a client" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {/* @ts-ignore */}
                      {allUsers?.map((item: any) => (
                        <SelectItem key={item.id} value={item?.id}>
                          {item?.firstName} {item?.lastName}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Client name must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="boatId"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Boat
                  </Typography>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      handleUserChange(value);
                    }}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary border bg-white text-typography-800">
                        <SelectValue placeholder="Select a boat" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white">
                      {/* @ts-ignore */}
                      {userBoats?.data?.map((item: any) => (
                        <SelectItem key={item.id} value={item?.id}>
                          {item?.namaKapal}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>Boat name must be valid.</FormDescription>
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
  layananId: z.string().min(1, {
    message: "Service Type must be at least 1 characters.",
  }),
  userId: z.string().min(1, {
    message: "User must be at least 1 characters.",
  }),
  boatId: z.string().min(1, {
    message: "Boat must be at least 1 characters.",
  }),
  duration: z.coerce.number().min(1, {
    message: "Service Duration be at least 1 digits.",
  }),
});

export default BillingCompany;
