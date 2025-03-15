import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUserApi } from "@/redux/reduxApi";
import { useSelector } from "react-redux";
import { userState } from "@/redux/stores/user";
import { IUser } from "@/utils/types";

const useAuth = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false); // Track if auth check is complete

  // Get cached user from Redux
  const cachedUser = useSelector(
    (state: userState) => state.getUserApi.queries["getUser(undefined)"]?.data
  );

  // Fetch user data (skip API call if user is in cache)
  const { data, isLoading, isFetching } = getUserApi.useGetUserQuery(
    undefined,
    {
      skip: !!cachedUser,
    }
  );

  const user = data || (cachedUser as IUser);

  useEffect(() => {
    if (!isLoading && !isFetching) {
      setChecked(true); // Mark auth check as complete
    }
  }, [isLoading, isFetching]);

  useEffect(() => {
    if (checked && !user) {
      router.replace("/auth/login");
    }
  }, [checked, user, router]);

  return { user, isLoading, isFetching };
};

export default useAuth;
