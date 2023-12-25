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

export type boatType = {
  id: string;
  name: string;
  tipeKapal: string;
  panjangKapal: string;
  kapasitasKapal: string;
  kapalAktif: string;
  dermaga: string;
};

export const columns: ColumnDef<boatType>[] = [
  {
    accessorKey: "namaKapal",
    header: "Nama",
  },
  {
    accessorKey: "jenisKapal",
    header: "Type",
  },
  {
    accessorKey: "panjangKapal",
    header: "Length",
  },
  {
    accessorKey: "kapasitasKapal",
    header: "Capacity",
  },
  {
    accessorKey: "kapasitasKapal",
    header: "Chassis",
  },
  {
    accessorKey: "kapalAktif",
    header: "Kapal Aktif",
    cell: ({ row }) => (
      <span>{!row ? "Sedang Beroperasi" : "Tidak Beroperasi"}</span>
    ),
  },
  {
    accessorKey: "dermaga",
    header: "Dermaga",
    cell: ({ row }) => <span>{!row ? "Dermaga x" : "Tidak Beroperasi"}</span>,
  },
  {
    id: "id",
    cell: ({ row }) => {
      const payment = row.original;

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
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Edit Boat
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete Boat</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
