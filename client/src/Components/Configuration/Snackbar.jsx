import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const initialSnack = {type: "", message: ""}

export default function CustomizedSnackbars({ message, type }) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  React.useEffect(() => {
    return () =>
      setTimeout(function () {
        setOpen(false);
      }, 3000);
  }, []);
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%"}}>
        {message}
      </Alert>
    </Snackbar>
  );
}