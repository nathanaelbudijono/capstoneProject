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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/forms/select-input";
import { Button } from "@/components/buttons/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover/popover";
import { Calendar } from "@/components/forms/calendar";
import { format } from "date-fns";
import cn from "@/type/clsxm";

import { AiOutlineLoading } from "react-icons/ai";
import { FaCalendarAlt } from "react-icons/fa";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "react-toastify";
import { nextAPIUrl } from "@/constant/env";
import axios from "axios";
import { useAppStore } from "@/lib/store";

interface userNewBoatType {
  id: string;
}

const UserNewBoat = ({ id }: userNewBoatType) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //----- # Start Region Submit Form # -----//
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const boatName = data.boatName;
      const tipeKapal = data.tipeKapal;
      const registrationNumber = data.registrationNumber;
      const panjangKapal = data.panjangKapal;
      const kapasitasKapal = data.kapasitasKapal;
      const tanggalBuat = data.tanggalBuat;
      const color = data.color;
      const chassis = data.chassis;
      const noMesin = data.noMesin;
      axios.defaults.withCredentials = true;
      await toast.promise(
        axios.post(
          `${nextAPIUrl}/kapal/user/createboat`,
          {
            id,
            boatName,
            tipeKapal,
            registrationNumber,
            panjangKapal,
            kapasitasKapal,
            tanggalBuat,
            color,
            chassis,
            noMesin,
          },
          {
            withCredentials: true,
          }
        ),
        {
          pending: "Creating new boat..",
          success: "Successfully created new boat!",
          error: "Failed to create new boat!",
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
    <main className="w-full">
      <Typography variant="h3" color="primary" className="text-center">
        Create new boat
      </Typography>
      <section className="shadow-lg px-6 py-3 w-full rounded-md mb-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 w-full flex-col"
          >
            <FormField
              control={form.control}
              name="boatName"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Boat Name
                  </Typography>
                  <FormControl>
                    <Input placeholder="Evergreen" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Boat name must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tipeKapal"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Boat Type
                  </Typography>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-primary border bg-white text-typography-800">
                        <SelectValue placeholder="Select a boat type." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white text-typography-800">
                      <SelectItem value="Kapal 1">Kapal 1</SelectItem>
                      <SelectItem value="kapal 2">Kapal 2</SelectItem>
                      <SelectItem value="kapal 3">Kapal 3</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>Boat Type must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Registration Number
                  </Typography>
                  <FormControl>
                    <Input
                      placeholder="KC 239501283 A 4"
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Boat registration number must be valid.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <section className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="panjangKapal"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Boat Length
                    </Typography>
                    <FormControl>
                      <Input placeholder="14 Meter" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Boat length must be positive.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="kapasitasKapal"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Boat capacity
                    </Typography>
                    <FormControl>
                      <Input placeholder="1 ton" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Boat capacity must be positive.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tanggalBuat"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Typography variant="med" color="primary">
                      Production Date
                    </Typography>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"icon"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-white",
                              !field.value && "text-typography-500"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <FaCalendarAlt className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      Production date must be valid.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
            <section className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Boat color
                    </Typography>
                    <FormControl>
                      <Input placeholder="Dark blue" type="text" {...field} />
                    </FormControl>
                    <FormDescription>Boat color must be valid.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="chassis"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Chassis
                    </Typography>
                    <FormControl>
                      <Input placeholder="LKD-31-DS" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Boat chassis must be valid.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="noMesin"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Machine Serial
                    </Typography>
                    <FormControl>
                      <Input
                        placeholder="2322-B2321-CD2"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Boat machine serial must be valid.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </section>
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
  boatName: z.string().min(1, {
    message: "boatName must be at least 1 characters.",
  }),
  tipeKapal: z.string().min(1, {
    message: "Boat type must be at least 1 characters.",
  }),
  registrationNumber: z.string().min(1, {
    message: "Registration number must be at least 1 characters.",
  }),
  panjangKapal: z.string().min(1, {
    message: "Boat Length type must be at least 1 digits.",
  }),
  kapasitasKapal: z.string().min(1, {
    message: "Boat Capacity type must be at least 1 digits.",
  }),
  tanggalBuat: z.date({
    required_error: "A date of production is required.",
  }),
  color: z.string().min(1, {
    message: "Color must be at least 1 characters.",
  }),
  chassis: z.string().min(1, {
    message: "Chassis must be at least 1 characters.",
  }),
  noMesin: z.string().min(1, {
    message: "Machine Number must be at least 1 characters.",
  }),
});
export default UserNewBoat;
