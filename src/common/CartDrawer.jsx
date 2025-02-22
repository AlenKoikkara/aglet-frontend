import React, { useState } from "react";
import './CartDrawer.scss';

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useSelector } from "react-redux";
import { selectCart } from "../features/cartSlice";
import DeleteIcon from '@mui/icons-material/Delete';
import CartButton from "./CartButton";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Button } from "@mui/material";
import utils from "../utils";
import { selectUser } from "../features/userSlice";

function CartDrawer({setOpen}) {
  const [draweropen, setDrawerOpen] = useState(false);
  const cart = useSelector(selectCart);
  const user = useSelector(selectUser)

  const toggleDrawer = (newOpen) => () => {
    setDrawerOpen(newOpen);
  };

  const placeOrder = () => {
    if (user) {
      utils.placeOrder(user,cart)
    } else {
      setOpen(true)
    }
  }
  
  const DrawerList = (
    <Box className="cartDrawer" role="presentation">
      <div className="header">
        <div className="title">Cart</div>
        <CloseRoundedIcon className="cartClose" onClick={toggleDrawer(false)}></CloseRoundedIcon>
      </div>
      <List>
        {cart?.map((item) => (
          <div className="cartItem">
            <img className="cartImage" src={item.imageUrl} alt=""></img>
            <div className="cartBody">
              <div className="productName"><a href={`/products/${item.productId}`}>{item.productName}</a></div>
              <div className="productSize">Size: {item.size}</div>
              <div className="productQty">Quantity: {item.count}</div>
              <div className="productprice">${item.listPrice}</div>
            </div>
            <div className="cartremovebutton">
              <CartButton config={{shoe: item, removeCart: true}}></CartButton>
            </div>
          </div>
        ))}
      </List>
      <Button className="placeOrder" onClick={() =>placeOrder()}>Checkout</Button>
    </Box>
  );

  return (
    <div>
      <ShoppingBagOutlinedIcon
        onClick={toggleDrawer(true)}
        className="carticon"
        fontSize={utils.isMobile() ? "medium" : "large"}
      ></ShoppingBagOutlinedIcon>
      {cart?.length > 0 && 
        <Drawer anchor="right" open={draweropen}>
          {DrawerList}
        </Drawer>
      }
    </div>
  );
};

export default CartDrawer;
