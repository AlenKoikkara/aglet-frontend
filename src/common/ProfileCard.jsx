import React from "react";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import { Button } from "@mui/material";
import image from '../assets/images/banner.png'

import "./ProfileCard.scss";
import authFunctions from "../authFunctions";
import { useDispatch } from "react-redux";
import EditProfileDialog from "./EditProfileDialog";

const ProfileCard = () => {
  const dispatch = useDispatch();

  function logout() {
    authFunctions.logoutUser(dispatch)
  }


  return (
    <div className="profileCardWrapper">
      <div className="profileCard">
        <div className="displayImage">
          <img className="profilePic" src={image} alt=""></img>
          {/* <FileUploadRoundedIcon className="editButton"></FileUploadRoundedIcon> */}
        <div className="profileHeader">
          <div className="userName">alen dennis</div>
          <div className="memberDate">Member Since February 2017</div>
        </div>
        </div>
        <div className="editProfile">
          <EditProfileDialog></EditProfileDialog>
          <Button className="logout" onClick={() => logout()}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
