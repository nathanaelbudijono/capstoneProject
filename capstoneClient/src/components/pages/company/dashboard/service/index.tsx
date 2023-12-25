import Typography from "@/components/core/typography";
import { serviceType } from "@/lib/slices/company-slices";
import { serviceColumns } from "@/modules/table/service-company/service-column";
import { DataServiceBoat } from "@/modules/table/service-company/service-table";
import { AiOutlineLoading } from "react-icons/ai";

const CompanyService = ({ service }: { service: serviceType }) => {
  if (!service) {
    return (
      <div className="h-screen flex justify-center items-center">
        <AiOutlineLoading className="animate-spin text-4xl" />
      </div>
    );
  }
  return (
    <main className="h-screen">
      <Typography variant="h3" color="primary">
        Service Owned
      </Typography>
      <Typography variant="small" className="mt-2">
        List of service owned.
      </Typography>
      <div className="container mx-auto py-5">
        {/* @ts-ignore */}
        <DataServiceBoat columns={serviceColumns} data={service} />
      </div>
    </main>
  );
};

const services = [
  {
    id: "12312324",
    jenisLayanan: "Loading/Unloading",
    harga: 12321313,
    pelabuhan: "No 1",
    satuanKerja: "Force A",
  },
  {
    id: "123124",
    jenisLayanan: "Fuel",
    harga: 123213,
    pelabuhan: "No 2",
    satuanKerja: "Force B",
  },
  {
    id: "123324",
    jenisLayanan: "Loading/Unloading",
    harga: 12321313,
    pelabuhan: "No 1",
    satuanKerja: "Force A",
  },
  {
    id: "123134g24",
    jenisLayanan: "Loading/Unloading",
    harga: 12321313,
    pelabuhan: "No 1",
    satuanKerja: "Force A",
  },
  {
    id: "1231342f24",
    jenisLayanan: "Loading/Unloading",
    harga: 12321313,
    pelabuhan: "No 1",
    satuanKerja: "Force A",
  },
];

export default CompanyService;
