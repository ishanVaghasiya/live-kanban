import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";

//* Use throughout your app instead of plain `useDispatch` and `useSelector` for type validation
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
