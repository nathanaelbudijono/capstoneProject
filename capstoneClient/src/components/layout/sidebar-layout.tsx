import Sidebar from "@/modules/sidebar";

const BaseLayout = ({ children }: any) => {
  return (
    <div className="flex relative">
      <Sidebar />
      <main className="layout__main-content">{children}</main>
    </div>
  );
};

export default BaseLayout;
