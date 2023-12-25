import * as React from "react";
import Seo from "@/components/core/seo";
import CompanyBaseLayout from "@/components/layout/company-sidebar-layout";
import Layout from "@/components/layout/layout";
import { companyType } from "@/lib/slices/company-slices";
import { validateCompany } from "@/lib/validation/company-validation";
import Navbar from "@/modules/navbar";
import { GetServerSidePropsContext } from "next";
import BillingCompany from "@/components/pages/company/dashboard/billing";

const CompanyBillingPage = ({ company }: { company: companyType }) => {
  return (
    <CompanyBaseLayout>
      <main className="bg-secondary-100 ">
        <Seo templateTitle="Services" />
        <Navbar id={company?.id} role={company?.role} />
        <Layout className="flex flex-col max-w-5xl">
          <BillingCompany id={company?.id} />
        </Layout>
      </main>
    </CompanyBaseLayout>
  );
};

export default CompanyBillingPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateCompany(ctx);
}
