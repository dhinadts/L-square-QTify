import axios from "axios";
import {
  Box,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import styles from "./AlbumList.module.css"; // Import CSS module
import theme from "../theme";
import CardItem from "./CardItem";
const AlbumList = ({ title }) => {
  const [albums, setAlbums] = useState([]);
  const [songs, setSongs] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchGenres = async () => {
    try {
      const res = await axios.get("https://qtify-backend-labs.crio.do/genres");
      setCategories(res.data.data);
    } catch (err) {
      console.error("Genre fetch error:", err);
    }
  };

  const GetList = async () => {
    try {
      const url =
        title === "Songs"
          ? `https://qtify-backend-labs.crio.do/songs`
          : `https://qtify-backend-labs.crio.do/albums/${
              title === "Top Albums" ? "top" : "new"
            }`;

      const response = await axios.get(url);
      if (title === "Songs") {
        setSongs(response.data);
        await fetchGenres(); // Only fetch genres for songs
      } else {
        setAlbums(response.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    GetList();
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Filter songs based on selected genre
  const filteredSongs =
    title === "Songs" && categories.length > 0
      ? songs.filter(
          (song) =>
            activeTab === 0 ||
            song.genre.label === categories[activeTab - 1]?.label
        )
      : songs;

  const listToRender = title === "Songs" ? filteredSongs : albums;

  const GenreTabs = () => (
    <Box
      sx={{
        width: "100%",
        color: "white",
        bgcolor: "primary.dark",
        mb: 2,
        display: "flex",
        justifyContent: "flex-start",
      }}
    >
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons
        TabIndicatorProps={{ style: { backgroundColor: "white" } }}
        allowScrollButtonsMobile
      >
        <Tab
          key="all"
          label="All"
          sx={{
            color: "white",
            "&.Mui-selected": {
              color: theme.palette.secondary.main || "cyan", // highlight selected
            },
          }}
        />
        {categories.map((genre) => (
          <Tab
            label={genre.label}
            sx={{
              color: "white",
              "&.Mui-selected": {
                color: theme.palette.secondary.main || "cyan",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      className={styles.wrapper}
      sx={{
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.main,
      }}
    >
      <Box className={styles.header}>
        <Typography variant="h5" color="white">
          {title}
        </Typography>
        <Button variant="text" onClick={() => setShowAll((prev) => !prev)}>
          {showAll ? "Collapse" : "Show More"}
        </Button>
      </Box>

      {title === "Songs" && <GenreTabs />}

      {showAll ? (
        <Box className={styles.cardContainer}>
          {listToRender.map((song) => (
            <Box key={song.id} className={styles.cardWrapper}>
              <CardItem song={song} title={title} />
            </Box>
          ))}
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            backgroundColor: theme.palette.primary.dark,
            color: theme.palette.primary.main,
          }}
        >
          {/* Left Arrow */}
          <img
            src="/assets/LeftArrow.svg"
            alt="Prev"
            className="swiper-button-prev-custom"
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              cursor: "pointer",
              width: 40,
            }}
          />

          {/* Right Arrow */}
          <img
            src="/assets/RightArrow.svg"
            alt="Next"
            className="swiper-button-next-custom"
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 2,
              cursor: "pointer",
              width: 40,
            }}
          />
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={7}
            breakpoints={{
              0: { slidesPerView: 3 },
              600: { slidesPerView: 5 },
              900: { slidesPerView: 5 },
              1200: { slidesPerView: 7 },
            }}
          >
            {listToRender.map((song) => (
              <SwiperSlide key={song.id}>
                <CardItem song={song} title={title} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default AlbumList;
