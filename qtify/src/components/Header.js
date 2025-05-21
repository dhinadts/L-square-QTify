import { Box, ThemeProvider } from "@mui/system";

const Header = () => {
  return (
    <>
      <ThemeProvider>
        <Box
          className="header"
          sx={(theme) => ({
            /*  display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    */ width: "100%",
            // maxWidth: "1200px",
            /*  gap: 2,
    px: 3,
    py: 2,
    */ height: { xs: "56px", sm: "64px", md: "90vh" },
            maxHeight: "100%",
            backgroundColor: theme.palette.primary.dark, // 🔹 background from theme
          })}
        >
          <div></div>
        </Box>
      </ThemeProvider>
    </>
  );
};

export default Header;
