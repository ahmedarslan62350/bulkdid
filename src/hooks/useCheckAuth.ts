import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "./use-toast";
import { useAppDispatch } from "@/redux/hooks/hooks";
import { logoutUser } from "@/redux/slices/authSlice";

export function useCheckAuth() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useCallback(
    (payload: { status?: number; message?: string }) => {
      if (payload?.status === 401) {
        toast({
          title: "Error",
          description: payload?.message,
          variant: "destructive",
        });
        dispatch(logoutUser()).then(() => {
          router.replace("/auth/login");
        });
      }
      return payload;
    },
    [dispatch, router]
  );
}
