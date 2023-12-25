import Seo from "@/components/core/seo";
import Layout from "@/components/layout/layout";
import RegisterUser from "@/components/pages/user/register";

const RegisterUserPage = () => {
  return (
    <main>
      <Seo templateTitle="Register User" />
      <Layout className="flex flex-col justify-center items-center">
        <RegisterUser />
      </Layout>
    </main>
  );
};

export default RegisterUserPage;
