
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@redux/slice/authslice";
import { useLoginMutation } from "@redux/api/authApi";
import { useRouter } from "next/router";

export const useLoginForm = () => {
  const [loginApi, { isLoading, error }] = useLoginMutation();

  const router = useRouter();
  const dispatch = useDispatch();
  const redirectTo = router.query.redirect || "/";

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const login = async (values: typeof initialValues) => {
    try {
      const response = await loginApi(values).unwrap();
      if (!response.success) {
        throw new Error(response.message || "Login failed");
      }

      dispatch(loginSuccess(response.data.user));
      router.push(redirectTo as string);
    } catch (error: any) {}
  };

  return {
    initialValues,
    validationSchema,
    login,
    isLoading,
    error: error as any,
  };
};