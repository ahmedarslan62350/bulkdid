import { useDispatch } from "react-redux";
import type { AppDispatch } from "../combinedStores";

export const useAppDispatch = () => useDispatch<AppDispatch>();
