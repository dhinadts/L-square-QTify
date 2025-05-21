import { InputAdornment, Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import CustomButton from "./CustomButton";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Navbar() {
  const {enqueueSnackbar} = useSnackbar();
  const [timerId, udpateTimerId] = useState(null);
  const [audiosList, updateAudios] = useState([]);
  const [audiosNotFound, updateAudiosNotFound] = useState(false);
  const performSearch = async (text) => {
      try {
        // updateAudiosNotFound(false)
        let url = 'config.endpoint';
        let product = await axios
          .get(`${url}/products/search?value=${text}`)
          .catch((e) => {
            updateAudiosNotFound(true);
          });
        if (product.data) {
          updateAudiosNotFound(false);
          updateAudios(product.data);
        }
      } catch (e) {
        console.log(e);
        enqueueSnackbar(e.response.data.message);
      }
    };
  
  const debounceSearch = (event, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    // wait for 500 ms and make a call
    // 1st request
    let timerId = setTimeout(() => performSearch(event), 500);
    udpateTimerId(timerId);
  }; 


  return (
    <Box
      className="header"
      bgcolor="primary.main"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      minHeight="5vh"
      px={4}
      py={2}
      gap={2}
    >
      {/* Logo */}
      <Box className="header-title">
        <img src="/assets/logo.png" alt="Qtify" height="35" />
      </Box>

      {/* Search Bar */}
      <Box
        flex={1}
        sx={{
          paddingX: 2,
          paddingY: 0.5,
        }}
      >
        <TextField
          size="small"
          fullWidth
          variant="outlined"
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            maxWidth: "600px", // Limit on large screens
            width: { xs: "100%", sm: "400px", md: "500px" },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="secondary" />
              </InputAdornment>
            ),
          }}
          placeholder="Search for items/Search a album of your choice"
          name="search"
          onChange={(e) => {
                debounceSearch(e.target.value, timerId);
              }}
        />
      </Box>

      {/* Feedback Button */}
      <CustomButton name="Give Feedback" />
    </Box>
  );
}

export default Navbar;
