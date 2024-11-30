import React from "react";
import { Formik, Form } from "formik";
import { Button, Box, Typography, Alert } from "@mui/material";
import * as Yup from "yup";
import { FormInput } from "@components/form/formik";
import KBButton from "@components/form/KBButton";
import useLoginForm from "./hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const { validationSchema, initialValues } = useLoginForm();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        if (
          values.email === "test@example.com" &&
          values.password === "password123"
        ) {
          alert("Login successful");
        } else {
          alert("Invalid email or password");
        }
      }}
    >
      {({}) => (
        <Form>
          <Box
            sx={{
              maxWidth: 400,
              margin: "auto",
              padding: 2,
              border: "1px solid #ccc",
              borderRadius: 2,
              boxShadow: 3,
              flexDirection: "column",
              display: "flex",
              gap: 2,
            }}
          >
            <Typography
              variant="h5"
              sx={{ textAlign: "center", marginBottom: 2 }}
            >
              Login
            </Typography>

            <FormInput name="email" label="Email" type="email" required />

            <FormInput
              name="password"
              label="Password"
              type="password"
              required
            />

            <KBButton
              type="submit"
              variant="contained"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Login
            </KBButton>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
