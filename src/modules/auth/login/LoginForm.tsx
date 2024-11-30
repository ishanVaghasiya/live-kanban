import React from "react";
import { Formik, Form } from "formik";
import { Box, Typography, Alert } from "@mui/material";
import { FormInput } from "@components/form/formik";
import KBButton from "@components/form/KBButton";
import { useLoginForm } from "./hooks/useLoginForm";

const LoginForm: React.FC = () => {
  const { validationSchema, initialValues, login, isLoading, error } =
    useLoginForm();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        login(values);
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

            {error && <Alert severity="error">{error?.data?.message}</Alert>}
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
              disabled={isLoading}
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
