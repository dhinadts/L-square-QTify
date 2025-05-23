import {
  Box,
  Card,
  CardMedia,
  Typography,
} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import styles from "./AlbumList.module.css"; // Import CSS module
import theme from "../theme";

 const CardItem = ({ song, title }) => (
    <Card
      className={styles.card}
      sx={{ backgroundColor: theme.palette.primary.dark }}
    >
      <Card className={styles.innerCard}>
        <CardMedia
          component="img"
          image={song.image}
          alt={song.title}
          className={styles.cardImage}
        />
        <Box className={styles.titleOverlay}>
          <Typography variant="subtitle1" fontWeight="bold">
            {song.title}
          </Typography>
        </Box>
        <Box className={styles.likesOverlay}>
          {title === "Songs"
            ? `${song.likes} Likes`
            : `${song.follows} Follows`}
        </Box>
      </Card>
      <Typography variant="subtitle1" fontWeight="bold" color="white">
        New Bollywood
      </Typography>
    </Card>
  );
export default CardItem;