import { Button, Dialog, TextField } from "@mui/material";
import React, { useState } from "react";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import utils from "../utils";
import { useFormik } from "formik";

const EditProfileDialog = () => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  const formData = useFormik({
    initialValues: {
      username: "",
      mobileNo: "",
      profilepic: ""
    },
    onSubmit: (values) => {},
  });

  const handleSignup = () => {
    formData.setTouched(true);
    formData.resetForm();
  };

  return (
    <div className="editProfileDialogbody">
      <Button className="editButton" onClick={() => handleClickOpen()}>
        Edit Profile
        <EditRoundedIcon fontSize="small"></EditRoundedIcon>
      </Button>
      <Dialog className="editProfileDialog" onClose={handleClose} open={open}>
        <div className="editprofileHeader">
          <div className="editProfileTitle">Edit Profile</div>
          <CloseRoundedIcon
            className="barIcon"
            onClick={() => handleClose()}
            fontSize={utils.isMobile() ? "medium" : "large"}
          ></CloseRoundedIcon>
        </div>
        <div className="form">
          <form onSubmit={formData.handleSubmit}>
            <TextField
              margin="dense"
              id="username"
              name="username"
              label="Username"
              type="text"
              fullWidth
              variant="standard"
              onBlur={formData.handleBlur}
              value={formData.values.email}
              onChange={formData.handleChange}
            />
            <TextField
              required
              margin="dense"
              id="mobileno"
              name="mobileno"
              label="mobileno"
              type="tel"
              placeholder="123-45-678"
              fullWidth
              variant="standard"
              onBlur={formData.handleBlur}
              value={formData.values.password}
              onChange={formData.handleChange}
            />
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default EditProfileDialog;
