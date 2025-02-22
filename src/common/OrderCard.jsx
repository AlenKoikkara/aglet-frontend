import React, { useState } from "react";
import "./OrderCard.scss";
import CartButton from "./CartButton";

import image from "../assets/images/banner.png";
import { useEffect } from "react";
import utils from "../utils";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "../axios";
import requests from "../requests";
import Line from "./Line";

const OrderCard = () => {
  const user = useSelector(selectUser);
  const [orders, setOrders] = useState([]);

  const getOrders = async (user) => {
    await axios
      .get(requests.getOrder(user.emailId))
      .then((res) => {
        console.log(res.data);
        setOrders(res.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  useEffect(() => {
    getOrders(user);
    return () => {};
  }, []);

  return (
    <div className="orderCard">
      <div className="orderCartTitle">Order History</div>
      <div className="orderList">
        {orders?.map((item, i) => (
          <div className="orderContent" key={item._id}>
            <div className="orderdate">19th May 2024</div>
            <div className="orderId">{item._id}</div>
            {item.order.map((order) => (
              <div className="orderItems">
                <img className="cartImage" src={order.imageUrl} alt=""></img>
                <div className="cartBody">
                  <div className="productName">
                    <a href={`/product/${order?.productId}`}>
                      {order?.productName}
                    </a>
                  </div>
                  <div className="productSize">Size: {order?.size}</div>
                  <div className="productQty">Quantity: {order?.count} | ${order?.listPrice}</div>
                </div>
              </div>
            ))}
            {i % 2 === 0 && <Line></Line>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderCard;
