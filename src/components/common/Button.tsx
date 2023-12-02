import { COLORS } from "@/constants";
import { ButtonPosition } from "@/enums";
import Button from "@mui/material/Button";
import * as React from "react";

interface IButtonProps {
  name: string;
  icon?: React.ReactNode;
  position?: "start" | "end";
  onClick: () => any;
  variant?: "text" | "outlined" | "contained";
  className?: string;
}

export default function MyButton(props: IButtonProps) {
  const renderButton = () => {
    if (props.position && props.icon) {
      if (props.position === ButtonPosition.start)
        return (
          <Button
            variant={props?.variant || "contained"}
            startIcon={props.icon}
            className={`w-full px-4 py-2.5 bg-[${COLORS.primary}] rounded-[5px] flex items-center justify-center ${props.className}`}
            onClick={props.onClick}
          >
            {props.name}
          </Button>
        );
      else
        return (
          <Button
            variant={props?.variant || "contained"}
            endIcon={props.icon}
            className={`w-full px-4 py-2.5 bg-[${COLORS.primary}] rounded-[5px] flex items-center justify-center ${props.className}`}
            onClick={props.onClick}
          >
            {props.name}
          </Button>
        );
    }
    return (
      <Button
        variant={props?.variant || "contained"}
        className={`w-full px-4 py-2.5 bg-[${COLORS.primary}] rounded-[5px] flex items-center justify-center ${props.className}`}
        onClick={props.onClick}
      >
        {props.name}
      </Button>
    );
  };

  return renderButton();
}
