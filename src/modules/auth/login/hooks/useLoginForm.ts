// // src/hooks/useLoginForm.ts
// import { useState } from "react";
// import { useFormik } from "formik";
// import * as Yup from "yup";

// interface LoginFormValues {
//   email: string;
//   password: string;
// }

// const useLoginForm = () => {
//   const validationSchema = Yup.object({
//     email: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     password: Yup.string()
//       .min(6, "Password must be at least 6 characters")
//       .required("Password is required"),
//   });

//   const initialValues = {
//     email: "",
//     password: "",
//   };

//   return {
//     validationSchema,
//     initialValues,
//   };
// };

// export default useLoginForm;

import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { loginSuccess } from "@redux/slice/authslice";
import { useLoginMutation } from "@redux/api/authApi";

export const useLoginForm = () => {
  const [loginApi, { isLoading, error }] = useLoginMutation();
  console.log("error", error);

  const dispatch = useDispatch();

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
