import { Alert, IconButton } from "@mui/material";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { IconX } from "@tabler/icons-react";
import { useGeneralStore } from "~/stores";

const Toast = () => {
  const { toasts, closeToast } = useGeneralStore();

  if (toasts.length === 0) return null;

  const handleClose = (id?: string, reason?: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }

    closeToast(id);
  };

  return (
    <>
      {toasts.map(({ id, message, params }, index) => (
        <Snackbar
          key={id}
          open={true}
          autoHideDuration={params?.autoHideDuration ?? 6000}
          onClose={(_, reason) => handleClose(id, reason)}
          anchorOrigin={{
            vertical: params?.anchorOrigin?.vertical ?? "bottom",
            horizontal: params?.anchorOrigin?.horizontal ?? "left",
          }}
          sx={{
            transform: `translateY(-${index * 70}px)`,
          }}
          action={
            params?.withCloseIcon && (
              <IconButton
                aria-label="close"
                color="inherit"
                sx={{ p: 0.5 }}
                onClick={() => handleClose(id)}
              >
                <IconX />
              </IconButton>
            )
          }
        >
          <Alert
            onClose={() => handleClose(id)}
            severity={params?.color ?? "info"}
            variant={params?.variant ?? "standard"}
            sx={{ width: "100%" }}
          >
            {message}
          </Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default Toast;
