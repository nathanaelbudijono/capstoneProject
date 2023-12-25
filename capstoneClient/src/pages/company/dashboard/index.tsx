import * as React from "react";

import Seo from "@/components/core/seo";
import CompanyBaseLayout from "@/components/layout/company-sidebar-layout";
import Layout from "@/components/layout/layout";
import DashboardCompany from "@/components/pages/company/dashboard";
import { companyType } from "@/lib/slices/company-slices";
import { useAppStore } from "@/lib/store";
import { validateCompany } from "@/lib/validation/company-validation";
import Navbar from "@/modules/navbar";
import { GetServerSidePropsContext } from "next";
import { AiOutlineLoading } from "react-icons/ai";

const CompanyDashboardPage = ({ company }: { company: companyType }) => {
  const { getCompanyProfile, companyProfile } = useAppStore();

  React.useEffect(() => {
    getCompanyProfile(company?.id);
  }, []);
  console.log(companyProfile);
  if (!companyProfile) {
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
        <Seo templateTitle="Admin Dashboard" />
        <Navbar id={company?.id} role={company?.role} />
        <Layout className="flex flex-col max-w-5xl">
          <DashboardCompany
            id={company?.id}
            name={companyProfile?.name}
            wallet={companyProfile?.wallet}
          />
        </Layout>
      </main>
    </CompanyBaseLayout>
  );
};

export default CompanyDashboardPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateCompany(ctx);
}
