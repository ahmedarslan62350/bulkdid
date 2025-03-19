// MyProfilePage.tsx (or .jsx/.js)
import withAuth from "@/redux/middleware";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/stores/store";
import { IUser } from "@/utils/types";
import { MyProfile } from "@/components/layout/client/MyProfile";

const MyProfilePage = () => {
  const user = useSelector(
    (state: RootState) => state.auth.user
  ) as IUser | null;
  return (
    <div className="container mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold text-primary mb-8">My Profile</h1>
      <MyProfile user={user} />
    </div>
  );
};

export default withAuth(MyProfilePage); // Only one default export
