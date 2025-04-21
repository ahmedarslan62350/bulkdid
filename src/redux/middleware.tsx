"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { ComponentType, FC } from "react";
import type { RootState } from "./combinedStores";

const withAuth = <P extends object>(Component: ComponentType<P>): FC<P> => {
  const ProtectedComponent: FC<P> = (props: P) => {
    const user = useSelector((state: RootState) => state.auth?.user);
    const router = useRouter();

    if (!user) {
      router.push("/auth/login");
      return null;
    }

    return (
      <>
        <Component {...props} />
      </>
    );
  };

  return ProtectedComponent;
};

export default withAuth;
