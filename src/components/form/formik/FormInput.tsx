import React from "react";
import { useField } from "formik";
import KBInput, { KBInputProps } from "../KBInput";

interface FormInputProps {
  name: string;
}

type Props = FormInputProps & KBInputProps;

const FormInput: React.FC<Props> = ({ name, label, required, ...props }) => {
  const [field, meta] = useField(name);

  return (
    <>
      <KBInput
        {...field}
        {...props}
        label={label}
        required={required}
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error ? meta.error : ""}
      />
    </>
  );
};

export default FormInput;
