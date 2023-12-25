import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";
import UserNewBoat from "@/components/pages/user/dashboard/boat/new";
import { userType } from "@/lib/slices/user-slices";
import { validateUser } from "@/lib/validation/user-validation";
import Navbar from "@/modules/navbar";
import { GetServerSidePropsContext } from "next";

const UserNewBoatPage = ({ user }: { user: userType }) => {
  return (
    <main className="bg-secondary-100">
      <BaseLayout>
        <Seo templateTitle="Create new boat" />
        <Navbar id={user?.id} role={user?.role} />
        <Layout className="flex flex-col max-w-5xl items-center">
          <UserNewBoat id={user?.id} />
        </Layout>
      </BaseLayout>
    </main>
  );
};

export default UserNewBoatPage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateUser(ctx);
}
