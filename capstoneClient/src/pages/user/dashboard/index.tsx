import * as React from "react";

import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";
import UserDashboard from "@/components/pages/user/dashboard";
import { validateUser } from "@/lib/validation/user-validation";
import Navbar from "@/modules/navbar";

import { GetServerSidePropsContext } from "next";
import { userType } from "@/lib/slices/user-slices";
const UserDashboardPage = ({ user }: { user: userType }) => {
  const firstName = user?.firstsName;
  const lastName = user?.lastName;
  const name = firstName + " " + lastName;

  return (
    <BaseLayout>
      <main className="bg-secondary-100 ">
        <Seo templateTitle="Dashboard" />
        <Navbar role={user?.role} id={user?.id} />
        <Layout className="flex flex-col max-w-5xl">
          <UserDashboard name={name} id={user?.id} />
        </Layout>
      </main>
    </BaseLayout>
  );
};

export default UserDashboardPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateUser(ctx);
}
