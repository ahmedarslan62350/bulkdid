import Transactions from "@/components/layout/admin/Transactions";
const page = () => {
  return (
    <>
      <div className="w-full h-screen p-5 overflow-y-auto scroll-smooth">
        <Transactions />
      </div>
    </>
  );
};

export default page;
