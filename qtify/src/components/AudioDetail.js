import { Search, SentimentDissatisfied } from "@mui/icons-material";
import {
  CircularProgress,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";


const AudioDetail = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [productData, updateProduct] = useState([]);
  const [isFetching, updateFecthed] = useState(false);
  const [productNotFound, updateProductNotFound] = useState(false);
  const [timerId, udpateTimerId] = useState("");
  const [userLoggedIn, updateUserLoggedIn] = useState(false);
  const [cartData, updateCartData] = useState([]);
  const [userCartItems, updateUserCartItems] = useState([]);
  const [userToken, updateUserToken] = useState("");
return (
    <></>
);
};

export default AudioDetail;