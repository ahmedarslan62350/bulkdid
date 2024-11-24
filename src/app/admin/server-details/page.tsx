import ServerDetails from "@/components/layout/admin/ServerDetails";
import React from "react";

const page = () => {
  return (
    <>
      <div className="w-full h-screen p-5 overflow-y-auto scroll-smooth">
        <ServerDetails />
      </div>
    </>
  );
};

export default page;
