import User from "@/components/layout/admin/User";
import { user } from "@/utils/dumyData";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  console.log(params)
  return <User user={user} />;
};

export default page;
