import { COLORS } from "@/constants";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";

export interface DialogProps {
  open: boolean;
  doAction: () => any;
  onClose: () => void;
  buttonName?: string;
  content?: string;
}

const DEFAULT_BUTTON_NAME: string = "Ok";
const DEFAULT_CONTENT: string = "Are you sure to delete this user";

export default function DialogDelete(props: DialogProps) {
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
    >
      <DialogTitle
        className="flex items-center justify-end"
        sx={{ padding: "16px 16px 0" }}
      >
        <IconButton
          aria-label="close"
          onClick={props.onClose}
          sx={{
            color: COLORS.primary,
            padding: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ p: "16px" }}>
        <span className="text-sm font-normal text-center block">
          {props?.content || DEFAULT_CONTENT}
        </span>
      </DialogContent>
      <DialogActions sx={{ padding: "0 16px 16px" }}>
        <div className="flex items-center justify-end gap-x-4">
          <Button
            sx={{
              padding: "10px 16px 10px 16px",
              backgroundColor: COLORS.secondaryButton,
              color: COLORS.primary,
              width: "147.5px",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "#ccc",
                opacity: 0.7,
                color: "black",
              },
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
              width: "147.5px",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: COLORS.primary,
                opacity: 0.7,
              },
            }}
            onClick={() => {
              props.doAction();
              props.onClose();
            }}
          >
            {props?.buttonName || DEFAULT_BUTTON_NAME}
          </Button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
