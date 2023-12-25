import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";
import UserTransaction from "@/components/pages/user/dashboard/transaction";
import Navbar from "@/modules/navbar";

import { validateUser } from "@/lib/validation/user-validation";
import { GetServerSidePropsContext } from "next";
import { userType } from "@/lib/slices/user-slices";

const UserTransactionPage = ({ user }: { user: userType }) => {
  return (
    <BaseLayout>
      <main className="bg-secondary-100 ">
        <Seo templateTitle="Transactions" />
        <Navbar id={user?.id} role={user?.role} />
        <Layout className="flex flex-col max-w-5xl">
          <UserTransaction id={user?.id} />
        </Layout>
      </main>
    </BaseLayout>
  );
};

export default UserTransactionPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateUser(ctx);
}
