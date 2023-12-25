import * as React from "react";
import Seo from "@/components/core/seo";
import CompanyBaseLayout from "@/components/layout/company-sidebar-layout";
import Layout from "@/components/layout/layout";
import CompanyService from "@/components/pages/company/dashboard/service";
import { companyType } from "@/lib/slices/company-slices";
import { useAppStore } from "@/lib/store";
import { validateCompany } from "@/lib/validation/company-validation";
import Navbar from "@/modules/navbar";
import { GetServerSidePropsContext } from "next";
import { AiOutlineLoading } from "react-icons/ai";

const CompanyServicePage = ({ company }: { company: companyType }) => {
  const { getCompanyService, service } = useAppStore();

  React.useEffect(() => {
    getCompanyService(company?.id);
  }, []);

  if (!service) {
    return (
      <CompanyBaseLayout>
        <main className="bg-secondary-100 ">
          <Seo templateTitle="Admin Dashboard" />
          <Navbar id={company?.id} role={company?.role} />
          <Layout className="flex flex-col max-w-5xl h-screen items-center justify-center">
            <AiOutlineLoading className="animate-spin text-4xl" />
          </Layout>
        </main>
      </CompanyBaseLayout>
    );
  }
  return (
    <CompanyBaseLayout>
      <main className="bg-secondary-100 ">
        <Seo templateTitle="Services" />
        <Navbar id={company?.id} role={company?.role} />
        <Layout className="flex flex-col max-w-5xl">
          {/* @ts-ignore */}
          <CompanyService service={service} />
        </Layout>
      </main>
    </CompanyBaseLayout>
  );
};

export default CompanyServicePage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateCompany(ctx);
}
