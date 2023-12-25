import Layout from "@/components/layout/layout";
import Seo from "@/components/core/seo";
import LoginPageUser from "@/components/pages/index/login";

export default function Home() {
  return (
    <main className="bg-secondary-100">
      <Seo templateTitle="Login" />
      <Layout className="justify-center items-center flex-col h-screen">
        <LoginPageUser />
      </Layout>
    </main>
  );
}
