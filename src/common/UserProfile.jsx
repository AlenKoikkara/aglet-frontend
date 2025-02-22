import React, { useEffect } from "react";
import "./UserProfile.scss";
import ProfileCard from "./ProfileCard";
import OrderCard from "./OrderCard";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import Favourites from "./Favourites";
function CustomTabPanel(props) {
  // const { children, value, index, ...other } = props;
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const UserProfile = () => {
  const [value, setValue] = React.useState(0);
  let location = useLocation();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (location.pathname.match("favourites")) {
      setValue(2)
    }
    if (location.pathname.match("profile")) {
      setValue(0)
    }
    return () => { 
    }
  }, [location])
  

  return (
    <div className="userProfileWrapper">
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Orders" {...a11yProps(1)} />
            <Tab label="Favourites" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ProfileCard></ProfileCard>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <OrderCard></OrderCard>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Favourites></Favourites>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default UserProfile;
