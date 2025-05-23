import React from "react";
import { Button } from "@mui/material";
import banner from "../../assets/images/banner.png";

import "./ProfileCard.scss";
import authFunctions from "../../authFunctions";
import { useDispatch } from "react-redux";
import EditProfileDialog from "./EditProfileDialog";

const ProfileCard = () => {
  const dispatch = useDispatch();

  function handleLogout() {
    authFunctions.logoutUser(dispatch)
  }


  return (
    <div className="profileCardWrapper">
      <div className="profileCard">
        <div className="displayImage">
          <img className="profilePic" src={banner} alt=""></img>
          {/* <FileUploadRoundedIcon className="editButton"></FileUploadRoundedIcon> */}
        <div className="profileHeader">
          <div className="userName">alen dennis</div>
          <div className="memberDate">Member Since February 2017</div>
        </div>
        </div>
        <div className="editProfile">
          <EditProfileDialog></EditProfileDialog>
          <Button className="logout" onClick={() => handleLogout()}>Logout</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
