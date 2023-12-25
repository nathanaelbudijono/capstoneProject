import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import LoginProvider from "@/components/pages/company/login";

const LoginProviderPage = () => {
  return (
    <main>
      <Seo templateTitle="Login Provider" />
      <Layout className="flex flex-col justify-center items-center h-screen">
        <LoginProvider />
      </Layout>
    </main>
  );
};

export default LoginProviderPage;
