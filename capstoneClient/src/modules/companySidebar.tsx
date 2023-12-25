import * as React from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import { useSidebarContext } from "@/hooks/useSidebar";

import { AiOutlineHome } from "react-icons/ai";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { PiMoneyLight } from "react-icons/pi";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaAnchor } from "react-icons/fa";

import { FaCircleUser, FaServicestack } from "react-icons/fa6";

import { Button } from "@/components/buttons/button";

const CompanySidebar = () => {
  const router = useRouter();
  const { isCollapsed, toggleSidebarcollapse } =
    React.useContext(useSidebarContext);

  return (
    <div className="sticky top-0 bg-primary">
      <Button variant="default" className="btn" onClick={toggleSidebarcollapse}>
        {isCollapsed ? <MdKeyboardArrowRight /> : <MdKeyboardArrowLeft />}
      </Button>

      <aside className="sidebar" data-collapse={isCollapsed}>
        <div className="sidebar__top pt-1">
          <Link href="http://localhost:3000/admin/dashboard">
            {!isCollapsed ? (
              <img src="/images/logo-dark.png" alt="logo" className="w-24" />
            ) : (
              <img
                src="/images/logo-short.png"
                alt="logo"
                className="w-[35px]"
              />
            )}
          </Link>
        </div>
        <ul className="sidebar__list">
          {sidebarItems.map(({ name, href, icon: Icon }) => {
            return (
              <li
                key={name}
                className={`sidebar__item relative flex flex-col ${
                  isCollapsed ? "items-center" : ""
                }  text-md text-typography-100  py-[0.6rem] px-[0.8rem] mb-[1rem] rounded-sm ${
                  router.pathname === href ? "bg-accent" : ""
                }`}
              >
                <Link href={href}>
                  <span className="sidebar__icon">
                    <Icon />
                  </span>
                  <span className="sidebar__name absolute top-2">{name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default CompanySidebar;

const sidebarItems = [
  {
    name: "Dashboard",
    href: "/company/dashboard",
    icon: AiOutlineHome,
  },
  {
    name: "Service",
    href: "/company/dashboard/service",
    icon: FaServicestack,
  },
  {
    name: "Billing",
    href: "/company/dashboard/billing",
    icon: FaMoneyBillTransfer,
  },
];
