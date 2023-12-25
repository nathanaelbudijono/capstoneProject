import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";
import UserUpdateProfile from "@/components/pages/user/profile/update";
import Navbar from "@/modules/navbar";
import { useRouter } from "next/router";

import { validateUser } from "@/lib/validation/user-validation";
import { GetServerSidePropsContext } from "next";
import { userType } from "@/lib/slices/user-slices";

const UserProfileUpdatePage = ({ user }: { user: userType }) => {
  const router = useRouter();
  const slug = router.query.slug as string;
  return (
    <BaseLayout>
      <main className="bg-secondary-100 relative">
        <Seo templateTitle="Update Profile" />
        <Navbar id={user?.id} role={user?.role} />
        <Layout className="flex flex-col max-w-5xl">
          <UserUpdateProfile slug={slug} />
        </Layout>
      </main>
    </BaseLayout>
  );
};

export default UserProfileUpdatePage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateUser(ctx);
}
