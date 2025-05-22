import axios from "axios";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const AlbumList = ({ title }) => {
  const [songs, setAlbums] = useState([]);

  const GetList = async () => {
    let endPoint = title === "Top Albums" ? "top" : "new";
    let url = `https://qtify-backend-labs.crio.do/albums/${endPoint}`;
    try {
      const response = await axios.get(url);
      setAlbums(response.data);
      console.log(response.data[0]);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    GetList();
  }, []);
  const onClick = (song) => {
    console.log(song);
  };

  const CardItem = ({ song, title }) => {
    return (
      <>
        <Card
          item
          sx={{
            display: "flex",
            width: 150,
            flexDirection: "column",
            bgcolor: "primary.dark",
            py: 2,
            px: 2,
          }}
        >
          <Card
            sx={{
              height: 150,
              width: "100%",
              backgroundColor: "#fff",
              borderRadius: 4,
              boxShadow: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              overflow: "hidden",
              position: "relative",
              paddingBottom: 2,
            }}
          >
            {}
            <CardMedia
              component="img"
              image={song.image}
              alt={song.title}
              sx={{
                width: "100%",
                height: 120,
                objectFit: "cover",
              }}
            />

            {}
            <Box
              sx={{
                position: "absolute",
                bottom: "30%",
                width: "100%",
                backgroundColor: "transparent",
                color: "white",
                textAlign: "center",
                textWrap: true,
                py: 0.5,
              }}
            >
              <Typography variant="subtitle1" fontWeight="bold" flexWrap={true}>
                {song.title}
              </Typography>
            </Box>

            {}
            <Box
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "8px",
                padding: "2px 8px",
                fontSize: "12px",
              }}
            >
              {song.follows} follows
            </Box>
          </Card>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            flexWrap={true}
            color="white"
          >
            New Bollywood
          </Typography>{" "}
        </Card>
      </>
    );
  };

  return (
    <>
      {songs.length === 0 ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="200px"
        >
          <CircularProgress />
        </Box>
      ) : (
        <Box
          sx={{
            margin: "0 auto",
            width: "98vw",
            paddingY: 2,
            paddingX: 2,
          }}
        >
          <Typography variant="h5" mb={2} align="left">
            {title}
          </Typography>
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={20}
            slidesPerView={7}
            breakpoints={{
              0: {
                slidesPerView: 3,
              },
              600: {
                slidesPerView: 5,
              },
              900: {
                slidesPerView: 5,
              },
              1200: {
                slidesPerView: 7,
              },
            }}
          >
            {songs.map((song) => (
              <SwiperSlide key={song.id}>
                <CardItem song={song} title={title} />
                {}
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </>
  );
};

export default AlbumList;
