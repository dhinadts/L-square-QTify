import { Box, ThemeProvider } from "@mui/system";

const Header = () => {
  return (
    <>
      <ThemeProvider>
        <Box
          className="header"
          sx={(theme) => ({
            height: { xs: "56px", sm: "64px", md: "90vh" },
            backgroundColor: theme.palette.primary.dark,
          })}
        ></Box>
      </ThemeProvider>
    </>
  );
};

export default Header;
