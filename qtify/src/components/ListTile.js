// components/ListTile.js
import { Box, Avatar, Typography, IconButton } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";

const ListTile = ({ leading, title, subtitle, trailing, onClick }) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        padding: 2,
        cursor: onClick ? "pointer" : "default",
        borderBottom: "1px solid #e0e0e0",
        "&:hover": {
          backgroundColor: "#f5f5f5",
        },
      }}
    >
      {/* Leading Icon or Avatar */}
      {leading && (
        <Box sx={{ mr: 2 }}>
          <Avatar src={leading} />
        </Box>
      )}

      {/* Title and Subtitle */}
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{title}</Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
      </Box>

      {/* Trailing Icon */}
      <Box>
        {trailing || (
          <IconButton size="small">
            <ChevronRightIcon />
          </IconButton>
        )}
      </Box>
    </Box>
  );
};

export default ListTile;
