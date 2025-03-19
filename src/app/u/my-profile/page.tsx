"use client"

import dynamic from "next/dynamic";

const DynamicProtectedProfilePage: any = dynamic(
  () => import("@/app/u/my-profile/MyProfile"),
  { ssr: false }
);

export default DynamicProtectedProfilePage;
