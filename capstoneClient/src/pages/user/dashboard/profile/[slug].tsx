import * as React from "react";

import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import BaseLayout from "@/components/layout/sidebar-layout";
import UserProfile from "@/components/pages/user/profile";
import { useAppStore } from "@/lib/store";
import Navbar from "@/modules/navbar";
import { useRouter } from "next/router";

import { GetServerSidePropsContext } from "next";
import { userType } from "@/lib/slices/user-slices";
import { validateUser } from "@/lib/validation/user-validation";

const UserProfilePage = ({ user }: { user: userType }) => {
  const { getProfile, profile } = useAppStore();
  const router = useRouter();
  const id = router.query.slug as string;
  React.useEffect(() => {
    getProfile(id);
  }, [id]);
  return (
    <BaseLayout>
      <main className="bg-secondary-100 relative">
        <Seo templateTitle="Profile" />
        <Navbar id={user?.id} role={user?.role} />
        <Layout className="flex flex-col max-w-5xl">
          <UserProfile user={profile} />
        </Layout>
      </main>
    </BaseLayout>
  );
};

export default UserProfilePage;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return await validateUser(ctx);
}
