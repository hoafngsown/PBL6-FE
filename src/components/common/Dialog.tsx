import { COLORS } from "@/constants";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import * as React from "react";

export interface DialogProps {
  open: boolean;
  doAction: () => any;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
  buttonName?: string;
  isShowAction?: boolean;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
  className?: string;
}

const DEFAULT_BUTTON_NAME: string = "Upload";

function Title(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        padding: "24px 24px 16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: "black",
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function MyDialog(props: DialogProps) {
  const { isShowAction = true } = props;

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick") return;
    props.onClose();
  };

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      {props.title && (
        <Title id="customized-dialog-title" onClose={props.onClose}>
          <span className="font-medium leading-6 text-xl">{props.title}</span>
        </Title>
      )}

      <DialogContent dividers sx={{ padding: "24px" }}>
        {props.children}{" "}
      </DialogContent>
      {isShowAction && (
        <DialogActions sx={{ padding: "16px 24px 24px 24px" }}>
          <div className="flex items-center justify-end gap-x-4">
            <Button
              sx={{
                padding: "10px 16px 10px 16px",
                backgroundColor: COLORS.secondaryButton,
                color: COLORS.primary,
              }}
              onClick={props.onClose}
            >
              Cancel
            </Button>
            <Button
              sx={{
                padding: "10px 16px 10px 16px",
                backgroundColor: COLORS.primary,
                color: COLORS.white,
                "&:hover": {
                  backgroundColor: COLORS.primary,
                  opacity: 0.7,
                },
              }}
              autoFocus
              onClick={() => {
                props.doAction();
                props.onClose();
              }}
              type="submit"
            >
              {props?.buttonName || DEFAULT_BUTTON_NAME}
            </Button>
          </div>
        </DialogActions>
      )}
    </Dialog>
  );
}
