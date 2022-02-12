import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Login from "./Login";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "70vw", md: "35vw" },
  bgcolor: "#192a45",
  color: "white",
  borderRadius: "7px",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>Iniciar Sesión</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          
          <Box sx={style}>
            <button
            style={{
              width:"15px",
              position: "absolute",
              right: "10px",
              top: "3%",
              backgroundColor: "red",
              border: "none",
              borderRadius: "5px",
              color: "white",
              paddingBottom: "3px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            x
          </button>
            <Login />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
