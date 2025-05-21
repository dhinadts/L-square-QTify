import { Box, Button } from "@mui/material";
import styles from "./CustomButton.module.css";
import theme from "../theme";

const CustomButton = ({ name = "Give Feedback", onClick }) => {
  return (
    <>
      <Box>
        <Button
          variant="contained"
          onClick={onClick}
          className={styles.button}
          sx={{
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.main,
            "&:hover": {
              backgroundColor: theme.palette.primary.dark ,
            },
          }}
        >
          {name}
        </Button>
      </Box>
    </>
  );
};

export default CustomButton;
