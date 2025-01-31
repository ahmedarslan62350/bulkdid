import Transaction from "@/components/layout/admin/Transaction";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  return (
    <div className="w-full h-screen p-5 overflow-y-auto scroll-smooth">
      <Transaction id={(await params).id}/>
    </div>
  );
};

export default page;
