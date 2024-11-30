import { FC } from "react";
import { Button, ButtonProps } from "@mui/material";

interface KBButtonProps extends ButtonProps {}

const KBButton: FC<KBButtonProps> = ({ ...rest }) => {
  return <Button {...rest} />;
};

export default KBButton;
