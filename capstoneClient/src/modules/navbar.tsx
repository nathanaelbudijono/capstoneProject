import * as React from "react";

import Typography from "@/components/core/typography";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/popover/popover";
import { clsx } from "clsx";

import { FaCircleUser, FaServicestack } from "react-icons/fa6";
import { CiUser, CiSettings } from "react-icons/ci";
import { BsActivity } from "react-icons/bs";
import { RiShutDownLine } from "react-icons/ri";

import { Button } from "@/components/buttons/button";
import { useRouter } from "next/router";
import axios from "axios";
import { toast } from "react-toastify";

interface NavbarProps {
  role: string;
  id: string;
}

export default function Navbar({ role, id }: NavbarProps) {
  const router = useRouter();
  const logout = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/authentication/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        router.push("http://localhost:3000/");
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };
  if (role === "company") {
    return (
      <main
        className={clsx("px-16 max-md:px-6 sticky top-0 z-10 py-2 bg-primary")}
      >
        <section>
          <div className="flex justify-end items-center py-4">
            <div className="flex gap-3 items-center">
              <Popover>
                <PopoverTrigger>
                  <FaCircleUser className="text-2xl text-typography-100" />
                </PopoverTrigger>
                <PopoverContent className="bg-secondary-100 w-full">
                  <section className="border-b pb-2 border-primary">
                    <Typography
                      variant="small"
                      className="text-xs pl-4"
                      color="muted"
                    >
                      View my profile
                    </Typography>
                  </section>
                  <section className="mt-2">
                    <Button
                      variant="ghost"
                      className="flex gap-2 items-center w-full justify-start"
                      onClick={() => {
                        router.push(
                          `http://localhost:3000/company/dashboard/profile/${id}`
                        );
                      }}
                    >
                      <CiUser />
                      <Typography variant="small">My Profile</Typography>
                    </Button>
                    {adminLinks?.map(({ icon: Icon, name, link }) => {
                      return (
                        <div key={name}>
                          <Button
                            variant="ghost"
                            className="flex items-center gap-2 mb-1 w-full justify-start"
                            onClick={() => {
                              router.push(link);
                            }}
                          >
                            <Icon />
                            <Typography variant="small">{name}</Typography>
                          </Button>
                        </div>
                      );
                    })}
                    <Button
                      variant="ghost"
                      className="flex gap-2 items-center w-full justify-start"
                      onClick={logout}
                    >
                      <RiShutDownLine />
                      <Typography variant="small">Logout</Typography>
                    </Button>
                  </section>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </section>
      </main>
    );
  }
  return (
    <main
      className={clsx("px-16 max-md:px-6 sticky top-0 z-10 py-2 bg-primary")}
    >
      <section>
        <div className="flex justify-end items-center py-4">
          <div className="flex gap-3 items-center">
            <Popover>
              <PopoverTrigger>
                <FaCircleUser className="text-2xl text-typography-100" />
              </PopoverTrigger>
              <PopoverContent className="bg-secondary-100 w-full">
                <section className="border-b pb-2 border-primary">
                  <Typography
                    variant="small"
                    className="text-xs pl-4"
                    color="muted"
                  >
                    View my profile
                  </Typography>
                </section>
                <section className="mt-2">
                  <Button
                    variant="ghost"
                    className="flex gap-2 items-center w-full justify-start"
                    onClick={() => {
                      router.push(
                        `http://localhost:3000/user/dashboard/profile/${id}`
                      );
                    }}
                  >
                    <CiUser />
                    <Typography variant="small">My Profile</Typography>
                  </Button>
                  {userLinks?.map(({ icon: Icon, name, link }) => {
                    return (
                      <div key={name}>
                        <Button
                          variant="ghost"
                          className="flex items-center gap-2 mb-1 w-full justify-start"
                          onClick={() => {
                            router.push(link);
                          }}
                        >
                          <Icon />
                          <Typography variant="small">{name}</Typography>
                        </Button>
                      </div>
                    );
                  })}
                  <Button
                    variant="ghost"
                    className="flex gap-2 items-center w-full justify-start"
                    onClick={logout}
                  >
                    <RiShutDownLine />
                    <Typography variant="small">Logout</Typography>
                  </Button>
                </section>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </section>
    </main>
  );
}

const userLinks = [
  {
    icon: BsActivity,
    name: "Activity Log",
    link: "http://localhost:3000/user/dashboard/activity",
  },
  {
    icon: CiSettings,
    name: "Account Settings",
    link: "http://localhost:3000/user/dashboard/settings",
  },
];

const adminLinks = [
  {
    icon: BsActivity,
    name: "Activity Log",
    link: "http://localhost:3000/user/dashboard/activity",
  },
  {
    icon: CiSettings,
    name: "Account Settings",
    link: "http://localhost:3000/user/dashboard/settings",
  },
];
