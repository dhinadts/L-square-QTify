import { Box, Typography } from "@mui/material";

const Hero = () => {
  return (
    <Box
      className="header-title"
      display="flex"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      sx={(theme) => ({
        height: 270,
        // width: "100%",
        backgroundColor: theme.palette.primary.dark,
        px: 4,
      })}
    >
      {/* Left side: Texts in column */}
      <Box display="flex" flexDirection="column" color="white" gap={1}>
        <Typography variant="h5" fontWeight="bold">
          100 Thousand Songs, ad-free
        </Typography>
        <Typography variant="h5" fontWeight="bold">
          Over Thousands of podcast episodes
        </Typography>
      </Box>

      {/* Right side: Image */}
      <Box>
        <img
          src="/assets/hero_headphones.png"
          alt="hero"
          height="212"
          style={{ /* maxWidth: "100%", */ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default Hero;
