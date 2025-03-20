import { Box, Dialog, DialogContent, IconButton } from "@mui/material";
import { IconX } from "@tabler/icons-react";

import { useGeneralStore } from "~/stores";

const Modal = () => {
  const { modals, closeModal } = useGeneralStore();

  if (modals.length === 0) return null;

  const baseStyle = {
    position: "absolute",
    width: "100%",
    border: "1px solid var(--mui-palette-background-paper)",
    boxShadow: 24,
    borderRadius: "8px",
    height: "100%",
    p: "24px",
  };

  return (
    <>
      {modals.map((modal, index) => {
        const offset = index * 25;

        const modalStyle = {
          ...baseStyle,
          top: `calc(50% + ${offset}px)`,
          left: `calc(50% + ${offset}px)`,
          transform: "translate(-50%, -50%)",
          zIndex: 1300 + index,
        };

        return (
          <Dialog
            key={index}
            open={true}
            onClose={() => closeModal(modal.id)}
            sx={{
              "& .MuiDialog-paper": { overflow: "visible" },
              ...modalStyle,
            }}
            fullWidth
            maxWidth="lg"
          >
            <IconButton
              aria-label="close-modal"
              onClick={() => closeModal(modal.id)}
              disableRipple
              className="justify-end!"
            >
              <IconX />
            </IconButton>
            <DialogContent className="w-full">
              <Box>
                <div className="overflow-auto max-h-full p-4">
                  {modal.content}
                </div>
              </Box>
            </DialogContent>
          </Dialog>
        );
      })}
    </>
  );
};

export default Modal;
