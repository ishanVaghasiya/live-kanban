import React from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";

export type KBInputProps = TextFieldProps;

const KBInput: React.FC<KBInputProps> = ({ ...props }) => {
  return <TextField fullWidth variant="outlined" {...props} />;
};

export default KBInput;
