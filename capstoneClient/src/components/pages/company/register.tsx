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

const RegisterProvider = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //----- # Start Region Submit Form # -----//
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const name = data.companyName;
    const companyID = data.companyId;
    const city = data.city;
    const country = data.country;
    const password = data.password;
    const confirmationPassword = data.confirmationPassword;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    try {
      setIsLoading(true);
      if (confirmationPassword === password) {
        const res = await axios.post(`${nextAPIUrl}/company/createcompany`, {
          name,
          companyID,
          city,
          country,
          password,
          email,
          phoneNumber,
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
          Register Company
        </Typography>
        <Typography variant="small" className="underline">
          Create a company Digital Pioneer account
        </Typography>
      </section>
      <section className="mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 w-full flex-col"
          >
            <div className="grid grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Company Name
                    </Typography>
                    <FormControl>
                      <Input
                        placeholder="PT Ruang Cipta"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Company name must be valid.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="companyId"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Company ID
                    </Typography>
                    <FormControl>
                      <Input placeholder="50022153" type="text" {...field} />
                    </FormControl>
                    <FormDescription>Company ID must be valid.</FormDescription>
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
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <Typography variant="med" color="primary">
                      Phone Number
                    </Typography>
                    <FormControl>
                      <Input placeholder="08518873950" type="text" {...field} />
                    </FormControl>
                    <FormDescription>
                      Phone number must be valid.
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
                      placeholder="ruangcipta@gmail.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Email must be valid</FormDescription>
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
              <UnstyledLink href="/company/login">
                Already have a company account?
              </UnstyledLink>
            </div>
            <div className="flex justify-end w-full">
              <Button variant="default" type="submit" className="w-1/4">
                {isLoading ? <AiOutlineLoading /> : "Register"}
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
  companyName: z.string().min(1, {
    message: "Company name must be at least 1 characters.",
  }),
  country: z.string().min(3, {
    message: "Country name must be at least 5 characters.",
  }),
  city: z.string().min(5, {
    message: "City name must be at least 5 characters.",
  }),
  phoneNumber: z.string().min(5, {
    message: "Phone number must be at least 5 digits.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  confirmationPassword: z.string().min(5, {
    message: "Confirmation Password must be at least 5 characters.",
  }),
  companyId: z.string().min(5, {
    message: "Company ID must be at least 5 digits.",
  }),
});

export default RegisterProvider;
