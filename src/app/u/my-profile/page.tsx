"use client"

// MyProfilePage.tsx (or .jsx/.js)
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/combinedStores";
import { IUser } from "@/utils/types";
import { MyProfile } from "@/components/layout/client/MyProfile";

const MyProfilePage = () => {
  const user = useSelector(
    (state: RootState) => state.auth?.user
  ) as IUser | null;

  return (
    <div className="w-full mx-auto px-4 py-10 h-screen scroll-smooth overflow-y-auto">
      <h1 className="text-4xl font-bold text-primary mb-8">My Profile</h1>
      <MyProfile user={user} />
    </div>
  );
};

export default MyProfilePage; // Only one default export
