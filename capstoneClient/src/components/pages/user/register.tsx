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
import { PasswordInput } from "@/components/forms/password-input";
import { Button } from "@/components/buttons/button";
import UnstyledLink from "@/components/links/unstyled-link";

import { GrLanguage } from "react-icons/gr";
import { AiOutlineLoading } from "react-icons/ai";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "react-toastify";

import axios from "axios";
import { nextAPIUrl } from "@/constant/env";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover/popover";
import { Calendar } from "@/components/forms/calendar";
import { format } from "date-fns";
import { FaCalendarAlt } from "react-icons/fa";
import cn from "@/type/clsxm";

const RegisterUser = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //----- # Start Region Submit Form # -----//
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const firstName = data.firstName;
    const lastName = data.lastName;
    const city = data.city;
    const country = data.country;
    const password = data.password;
    const confirmationPassword = data.confirmationPassword;
    const email = data.email;
    const dob = data.dob;
    const phoneNumber = data.phoneNumber;
    try {
      setIsLoading(true);
      if (confirmationPassword === password) {
        const res = await axios.post(`${nextAPIUrl}/user/createuser`, {
          firstName,
          lastName,
          phoneNumber,
          city,
          country,
          password,
          email,
          dob,
        });
        await toast.promise(Promise.resolve(res.data), {
          pending: "Registering your account..",
          success: "Register success, please redirect to login page..",
          error: "An unkown error occured..",
        });
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }
  //----- # End Region Submit Form # -----//
  return (
    <main className="shadow-lg px-6 py-3 w-3/4 rounded-md max-md:w-full">
      <section className="flex justify-between items-center">
        <img src="/images/logo.png" alt="logo" className="w-24" />
        <GrLanguage className="text-md" />
      </section>
      <section className="mt-3 flex flex-col gap-1">
        <Typography variant="h3" className="tracking-wide">
          Register
        </Typography>
        <Typography variant="small" className="underline">
          Create a Digital Pioneer account
        </Typography>
      </section>
      <section className="mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 w-full flex-col"
          >
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      First Name
                    </Typography>
                    <FormControl>
                      <Input placeholder="John" type="text" {...field} />
                    </FormControl>
                    <FormDescription>First Name must be valid.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Last Name
                    </Typography>
                    <FormControl>
                      <Input placeholder="Doe" type="text" {...field} />
                    </FormControl>
                    <FormDescription>Last Name must be valid.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Phone Number
                    </Typography>
                    <FormControl>
                      <Input
                        placeholder="085100875060"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Phone Number must be valid.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      City
                    </Typography>
                    <FormControl>
                      <Input placeholder="London" {...field} />
                    </FormControl>
                    <FormDescription>City must be valid.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Country
                    </Typography>
                    <FormControl>
                      <Input
                        placeholder="United Kingdom"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>Country must be valid.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dob"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <Typography variant="med" color="primary">
                      Date of Birth
                    </Typography>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"icon"}
                            className={cn(
                              "w-full pl-3 text-left font-normal",
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
                      You cannot change your date of birth.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Email
                  </Typography>
                  <FormControl>
                    <Input
                      placeholder="johndoe@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    You cannot change your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Password
                  </Typography>
                  <FormControl>
                    <PasswordInput placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Password must be 5 digits minimum.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmationPassword"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Confirmation Password
                  </Typography>
                  <FormControl>
                    <PasswordInput
                      placeholder="Confirmation Password"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Your confirmation password must be same as your password.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <UnstyledLink href="/">Already have an account?</UnstyledLink>
            </div>
            <div className="flex justify-end w-full">
              <Button variant="default" type="submit" className="w-1/4">
                {isLoading ? (
                  <AiOutlineLoading className="animate-spin" />
                ) : (
                  "Register"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};

const FormSchema = z.object({
  email: z.string().min(1, {
    message: "Email must be at least 1 characters.",
  }),
  firstName: z.string().min(5, {
    message: "First name must be at least 5 characters.",
  }),
  lastName: z.string().min(5, {
    message: "Last name must be at least 5 characters.",
  }),
  phoneNumber: z.string().min(11, {
    message: "Phone Number must be at least 11 digits.",
  }),

  country: z.string().min(3, {
    message: "Country name must be at least 5 characters.",
  }),
  city: z.string().min(5, {
    message: "City name must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  confirmationPassword: z.string().min(5, {
    message: "Confirmation Password must be at least 5 characters.",
  }),
  dob: z.date({
    required_error: "A date of birth is required.",
  }),
});

export default RegisterUser;
