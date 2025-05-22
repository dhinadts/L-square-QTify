import { InputAdornment, Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import CustomButton from "./CustomButton";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import axios from "axios";

function Navbar() {
  const { enqueueSnackbar } = useSnackbar();
  const [timerId, updateTimerId] = useState(null);
  const [audiosList, updateAudios] = useState([]);
  const [audiosNotFound, updateAudiosNotFound] = useState(false);

  const performSearch = async (text) => {
    try {
      const url = "config.endpoint";
      const product = await axios.get(`${url}/products/search?value=${text}`);
      if (product.data) {
        updateAudiosNotFound(false);
        updateAudios(product.data);
      }
    } catch (e) {
      updateAudiosNotFound(true);
      enqueueSnackbar(e?.response?.data?.message || "Search failed");
    }
  };

  const debounceSearch = (value, debounceTimeout) => {
    clearTimeout(debounceTimeout);
    const newTimerId = setTimeout(() => performSearch(value), 500);
    updateTimerId(newTimerId);
  };

  return (
    <Box
      bgcolor="primary.main"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      px={3}
      py={2}
    >
      {/* Logo */}
      <Box className="header-title">
        <img src="/assets/logo.png" alt="Qtify" height="35" />
      </Box>

      {/* Search Bar */}
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          px: 2,
        }}
      >
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search for items / Search an album of your choice"
          fullWidth
          onChange={(e) => debounceSearch(e.target.value, timerId)}
          sx={{
            backgroundColor: "white",
            borderRadius: 1,
            maxWidth: "600px",
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Search color="secondary" />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Feedback Button */}
      <CustomButton name="Give Feedback" />
    </Box>
  );
}

export default Navbar;
