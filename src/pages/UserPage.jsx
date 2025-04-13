import React from "react";
import "./UserPage.scss";
import NavBar from "../components/layout/NavBar";
import UserProfile from "../components/ui/UserProfile";
import Footer from "../components/layout/Footer";

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
