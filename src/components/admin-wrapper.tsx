import { toast } from "@/hooks/use-toast";
import { RootState } from "@/redux/combinedStores";
import { IUser } from "@/utils/types";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const user = useSelector((state: RootState) => state.auth.user) as IUser;
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false); // Ensure component is mounted before redirecting

  useEffect(() => {
    setIsMounted(true); 

    if (isMounted && (!user || Object.keys(user).length === 0)) {
      toast({
        title: "Error",
        description: "You are not allowed to perform this action",
        variant: "destructive",
      });

      router.replace("/auth/login");
    }
  }, [isMounted, user, router]);

  if (!isMounted) return null; // Prevent mismatched rendering

  return <>{children}</>;
};

export default AuthWrapper;
