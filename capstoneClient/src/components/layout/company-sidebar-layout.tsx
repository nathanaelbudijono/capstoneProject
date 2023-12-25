import CompanySidebar from "@/modules/companySidebar";

const CompanyBaseLayout = ({ children }: any) => {
  return (
    <div className="flex relative">
      <CompanySidebar />
      <main className="layout__main-content">{children}</main>
    </div>
  );
};

export default CompanyBaseLayout;
