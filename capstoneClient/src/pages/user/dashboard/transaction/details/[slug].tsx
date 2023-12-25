import * as React from "react";

import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";
import UserTransaction from "@/components/pages/user/dashboard/transaction";
import Navbar from "@/modules/navbar";

import { validateUser } from "@/lib/validation/user-validation";
import { GetServerSidePropsContext } from "next";
import { userType } from "@/lib/slices/user-slices";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/router";
import Typography from "@/components/core/typography";
import { AiOutlineLoading } from "react-icons/ai";

const UserTransactionDetailPage = ({ user }: { user: userType }) => {
  const router = useRouter();
  const id = router.query.slug as string;

  const { getTransactionByID, transactions } = useAppStore();
  React.useEffect(() => {
    getTransactionByID(id);
  }, [id]);
  console.log(transactions);

  if (!transactions) {
    return (
      <BaseLayout>
        <main className="bg-secondary-100 ">
          <Seo templateTitle="Transaction Detail" />
          <Navbar id={user?.id} role={user?.role} />
          <Layout className="flex flex-col max-w-5xl h-screen items-center justify-center">
            <AiOutlineLoading className="animate-spin text-4xl" />
          </Layout>
        </main>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <main className="bg-secondary-100 ">
        <Seo templateTitle="Transaction Detail" />
        <Navbar id={user?.id} role={user?.role} />
        <Layout className="flex flex-col max-w-5xl h-screen">
          <Typography variant="h3" color="primary">
            Transaction Detail
          </Typography>
          <section className="mt-5 flex justify-between items-center">
            <Typography variant="h1" color="primary">
              {/* @ts-ignore */}
              {transactions[0].Billing[0].DataKapal?.namaKapal}
            </Typography>
            <div className="mt-5 flex gap-2 items-center">
              <Typography variant="small">Payment status</Typography>
              {/* @ts-ignore */}
              {transactions[0].status === "Pending" && (
                <Typography
                  variant="h4"
                  color="primary"
                  className="px-2 py-1 rounded-md bg-yellow-400 w-fit"
                >
                  {/* @ts-ignore */}
                  {transactions[0].status}
                </Typography>
              )}
              {/* @ts-ignore */}
              {transactions[0].status === "Paid" && (
                <Typography
                  variant="h4"
                  color="primary"
                  className="px-2 py-1 rounded-md bg-green-400 w-fit"
                >
                  {/* @ts-ignore */}
                  {transactions[0].status}
                </Typography>
              )}
            </div>
          </section>
          {/* @ts-ignore */}
          {transactions[0].status === "Paid" && (
            <Typography variant="med">
              {/* @ts-ignore */}
              Paid at {transactions[0].paymentDate.substring(0, 10)}
            </Typography>
          )}
          <section className="mt-5">
            <Typography variant="large">Service used</Typography>
            <div className="flex gap-5 flex-col mt-3">
              {/* @ts-ignore */}
              {transactions[0].Billing.map((bill, index) => (
                <div key={index} className="grid grid-cols-2 gap-x-2">
                  <Typography variant="small">Company Name</Typography>
                  <Typography variant="small">{bill.Company?.name}</Typography>
                  <Typography variant="small">Service Name</Typography>
                  <Typography variant="small">
                    {bill.Layanan.jenisLayanan}
                  </Typography>
                  <Typography variant="small">Duration</Typography>
                  <Typography variant="small">{bill.duration} hours</Typography>
                  <Typography variant="small">Price</Typography>
                  <Typography variant="small">
                    {bill.Layanan.harga
                      .toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })
                      .replace(/^(\D+)/, "Rp ")}
                  </Typography>
                  <Typography variant="small">Dock</Typography>
                  <Typography variant="small">
                    {bill.Layanan.pelabuhan}
                  </Typography>
                  <Typography variant="small">Work Force</Typography>
                  <Typography variant="small">
                    {bill.Layanan.satuanKerja}
                  </Typography>
                </div>
              ))}
            </div>
          </section>
        </Layout>
      </main>
    </BaseLayout>
  );
};

export default UserTransactionDetailPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateUser(ctx);
}
