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
import UnstyledLink from "@/components/links/unstyled-link";
import { Button } from "@/components/buttons/button";

import { GrLanguage } from "react-icons/gr";
import { AiOutlineLoading } from "react-icons/ai";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { toast } from "react-toastify";

import axios from "axios";
import { nextAPIUrl } from "@/constant/env";

import { useRouter } from "next/router";

const LoginProvider = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  //----- # Start Region Submit Form # -----//
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const email = data.email;
    const password = data.password;
    try {
      setIsLoading(true);
      const res = await axios.post(
        `${nextAPIUrl}/authentication/rolecompany`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) router.push("/company/dashboard");
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
          Login Company
        </Typography>
        <Typography variant="small" className="underline">
          Login company with Digital Pioneer account
        </Typography>
        <Typography variant="small">You will be redirected to</Typography>
        <Typography variant="med" color="primary">
          Company dashboard menu
        </Typography>
      </section>
      <section className="mt-3">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 flex-col"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    Email
                  </Typography>
                  <FormControl>
                    <Input placeholder="ruangcipta@gmail.com" {...field} />
                  </FormControl>
                  <FormDescription>Enter your email.</FormDescription>
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
                  <FormDescription>Enter your password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <UnstyledLink href="/company/register">
                Create new company account
              </UnstyledLink>
            </div>
            <div className="flex justify-end w-full">
              <Button variant="default" type="submit" className="w-1/4">
                {isLoading ? <AiOutlineLoading /> : "Login"}
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
};

const FormSchema = z.object({
  email: z.string().min(5, {
    message: "Email must be at least 5 characters.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export default LoginProvider;
