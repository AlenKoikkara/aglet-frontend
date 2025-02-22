import React from "react";

import "./LoginDialog.scss";
import Dialog from "@mui/material/Dialog";
import LoginForm from "./LoginForm";

function LoginDialog({ open, setOpen }) {
  
  function handleClose() {
    setOpen(false);
    console.log(open)
  }

  const closeDialog = () => {
    handleClose();
  };

  return (
    <div>
      <Dialog open={open} onClose={closeDialog}>
        <LoginForm handleClose={handleClose}></LoginForm>
      </Dialog>
    </div>
  );
}

export default LoginDialog;
