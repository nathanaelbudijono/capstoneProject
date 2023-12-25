import * as React from "react";

import { Button } from "@/components/buttons/button";
import Typography from "@/components/core/typography";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/forms/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Input } from "@/components/forms/input";

import { AiOutlineLoading } from "react-icons/ai";

import { toast } from "react-toastify";
import { nextAPIUrl } from "@/constant/env";
import axios from "axios";
import DropzoneInput from "@/components/forms/dropzone";
import { useAppStore } from "@/lib/store";

interface updateType {
  slug: string;
}

const UserUpdateProfile = ({ slug }: updateType) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const { getProfile, profile } = useAppStore();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  React.useEffect(() => {
    getProfile(slug);
    form.reset({
      firstName: profile?.data?.firstName,
      lastName: profile?.data?.lastName,
      phoneNumber: profile?.data?.phoneNumber,
      city: profile?.data?.city,
      country: profile?.data?.country,
    });
  }, [slug]);

  if (!profile?.data) {
    return (
      <main className="h-screen flex justify-center items-center flex-col gap-3">
        <AiOutlineLoading className="animate-spin text-5xl max-md:text-4xl max-sm:text-3xl" />
        <Typography variant="h4" color="primary" className="text-center">
          Hold on...
        </Typography>
      </main>
    );
  }

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    const firstName = data.firstName;
    const lastName = data.lastName;
    const city = data.city;
    const country = data.country;
    const phoneNumber = data.phoneNumber;
    const id = profile?.data?.id;
    const gallery = data.gallery;
    try {
      await toast.promise(
        axios.post(`${nextAPIUrl}/user/updateuser`, {
          id,
          firstName,
          lastName,
          city,
          country,
          phoneNumber,
        }),
        {
          pending: "Loading...",
          success: "Profile updated successfully",
          error: "Profile update failed",
        }
      );
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <main className="w-full">
      <Typography variant="h3" color="primary" className="text-center">
        Update my profile
      </Typography>
      <section className="shadow-lg px-6 py-3 w-full rounded-md mb-5">
        <Form {...form}>
          <form
            className="flex gap-3 w-full flex-col"
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                    <Input placeholder="085100875060" type="text" {...field} />
                  </FormControl>
                  <FormDescription>Phone Number must be valid.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Typography variant="med" color="primary">
                    City
                  </Typography>
                  <FormControl>
                    <Input placeholder="London" type="text" {...field} />
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
              name="gallery"
              render={({ field }) => (
                <FormItem className="mt-3">
                  <Typography variant="med" color="primary">
                    Upload Profile Picture
                  </Typography>
                  <FormControl>
                    <DropzoneInput
                      id="gallery"
                      accept={{
                        "image/*": [".png", ".jpg", ".jpeg", ".webp"],
                      }}
                      isLoading={isLoading}
                      // clearPicture={clearPicture}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Upload file with .png, .jpg, .jpeg, atau .webp extension.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button variant="default" type="submit">
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
  gallery: z.custom<File>(),
});
export default UserUpdateProfile;
