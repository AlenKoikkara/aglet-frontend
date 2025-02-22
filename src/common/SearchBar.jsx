import React, { useState } from "react";
import "./SearchBar.scss";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Dialog } from "@mui/material";
import utils from "../utils";
import axios from "../axios";
import requests from "../requests";

export const SearchBar = () => {
  const [searchInput, setSearchInput] = useState();
  const [products, setProducts] = useState();

  const handleSearch = async (e) => {
    await axios
      .get(requests.searchProducts, { params: { qs: e.target.value } })
      .then((res) => {
        setProducts(res.data);
      });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setProducts(null);
  };

  return (
    <div className="searchBarbody" id="searchBarbody">
      {!open && (
        <div className="barInput" id="barInput">
          <SearchRoundedIcon
            className="barIcon"
            onClick={() => handleClickOpen()}
            fontSize={utils.isMobile() ? "medium" : "large"}
          ></SearchRoundedIcon>
        </div>
      )}
      <Dialog className="searchDialog" onClose={handleClose} open={open}>
        <div className="searchHeader">
          <input
            className="searchText"
            margin="dense"
            id="searchText"
            name="searchText"
            type="text"
            autoFocus
            placeholder="start typing..."
            value={searchInput}
            onChange={handleSearch}
          />
          <CloseRoundedIcon
            className="barIcon"
            onClick={() => handleClose()}
            fontSize={utils.isMobile() ? "medium" : "large"}
          ></CloseRoundedIcon>
        </div>
        {products?.length > 0 && (
          <div className="searchBarOutput">
            {products?.map((item) => (
              <div className="searchItem">
                <a href={`/product/${item._id}`}>{item.productName}</a>
              </div>
            ))}
          </div>
        )}
      </Dialog>
    </div>
  );
};

// export default SearchBar;
