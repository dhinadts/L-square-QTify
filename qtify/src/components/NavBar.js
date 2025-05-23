import { Typography, InputAdornment, Box, TextField } from "@mui/material";
import { Search } from "@mui/icons-material";
import CustomButton from "./CustomButton";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import axios from "axios";
import ListTile from "./ListTile";

function Navbar() {
  const { enqueueSnackbar } = useSnackbar();
  const [timerId, updateTimerId] = useState(null);
  const [audiosList, updateAudios] = useState([]);
  const [audiosNotFound, updateAudiosNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const performSearch = async (text) => {
    try {
      const res = await axios.get(`https://qtify-backend-labs.crio.do/songs`);
      const filtered = res.data.filter((song) =>
        song.title.toLowerCase().includes(text.toLowerCase())
      );

      if (filtered.length > 0) {
        updateAudiosNotFound(false);
        updateAudios(filtered);
      } else {
        updateAudios([]);
        updateAudiosNotFound(true);
      }
    } catch (e) {
      updateAudios([]);
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
      alignItems="center"
      px={3}
      py={2}
    >
      {/* Logo */}
      <Box>
        <img src="/assets/logo.png" alt="Qtify" height="35" />
      </Box>

      {/* Search */}
      <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            maxWidth: "600px",
          }}
        >
          <TextField
            size="small"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setSearchQuery(value);
              debounceSearch(value, timerId);
            }}
            placeholder="Search an album of your choice"
            sx={{ backgroundColor: "white", borderRadius: 1 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search color="secondary" />
                </InputAdornment>
              ),
            }}
          />
          {searchQuery && (audiosList.length > 0 || audiosNotFound) && (
            <Box
              sx={{
                position: "absolute",
                top: "100%",
                left: 0,
                width: "100%",
                maxHeight: "300px",
                overflowY: "auto",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: 1,
                zIndex: 10,
                boxShadow: 3,
                mt: 1,
              }}
            >
              {audiosNotFound ? (
                <Typography sx={{ p: 1 }} color="text.secondary">
                  No results found.
                </Typography>
              ) : (
                audiosList.map((song) => (
                  <ListTile
                    leading={song.image}
                    title={song.title}
                    subtitle={song.artists}
                    // trailing={}
                    onClick={() => {}}
                    key={song.id}
                  />
                ))
              )}
            </Box>
          )}
        </Box>
      </Box>

      {/* Feedback Button */}
      <Box>
        <CustomButton name="Give Feedback" />
      </Box>
    </Box>
  );
}

export default Navbar;
