import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/buttons/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/dropdown/dropdown";
import axios from "axios";
import { nextAPIUrl } from "@/constant/env";
import { toast } from "react-toastify";
import Link from "next/link";

export type paymentType = {
  id: string;
  status: string;
  totalAmount: number;
  namaKapal: string[];
};

export const paymentColumns: ColumnDef<paymentType>[] = [
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => {
      const amount = row.original.totalAmount;
      return (
        <span>
          {amount
            .toLocaleString("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })
            .replace(/^(\D+)/, "Rp ")}
        </span>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "namaKapal",
    header: "Boat Name",
    cell: ({ row }) => {
      return <span>{row.original.namaKapal[0]}</span>;
    },
  },
  {
    accessorKey: " ",
    cell: ({ row }) => {
      const paymentId = row.original.id;
      const handlePay = async () => {
        try {
          axios.defaults.withCredentials = true;
          const res = await axios.post(
            `${nextAPIUrl}/userbilling/makePayment`,
            {
              paymentId,
            },
            {
              withCredentials: true,
            }
          );
          await toast.promise(Promise.resolve(res.data), {
            pending: "Paying your bills..",
            success: "Successfully payed your bill..",
            error: "An unkown error occured..",
          });
        } catch (err: any) {
          toast.error(err?.response?.data?.message);
        }
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={handlePay}>Pay</DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`http://localhost:3000/user/dashboard/transaction/details/${paymentId}`}
              >
                Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
