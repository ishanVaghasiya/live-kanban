// src/hooks/useLoginForm.ts
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

interface LoginFormValues {
  email: string;
  password: string;
}

const useLoginForm = () => {
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  return {
    validationSchema,
    initialValues,
  };
};

export default useLoginForm;
