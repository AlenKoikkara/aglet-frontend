import React from "react";
import "./UserPage.scss";
import NavBar from "../common/NavBar";
import UserProfile from "../common/UserProfile";
import Footer from "../common/Footer";

export const UserPage = () => {
  return (
    <div className="body">
      <NavBar></NavBar>
      <UserProfile></UserProfile>
      <div className="footer">
        <Footer></Footer>
      </div>
    </div>
  );
};

export default UserPage;
