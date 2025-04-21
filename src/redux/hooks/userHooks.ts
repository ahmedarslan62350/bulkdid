import { useDispatch } from "react-redux";
import type { AppDispatch as UserAppDispatch } from "../combinedStores";

export const useUserAppDispatch = () => useDispatch<UserAppDispatch>();
