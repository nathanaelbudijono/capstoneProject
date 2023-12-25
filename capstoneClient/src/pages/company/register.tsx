import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import RegisterProvider from "@/components/pages/company/register";

const RegisterProviderPage = () => {
  return (
    <main>
      <Seo templateTitle="Register Provider" />
      <Layout className="flex flex-col items-center justify-center">
        <RegisterProvider />
      </Layout>
    </main>
  );
};

export default RegisterProviderPage;
