import Navbar from "./NavBar";
import Hero from "./Hero";
// import Header from "./Header";
// import { Search, SentimentDissatisfied } from "@mui/icons-material";
import { Box } from "@mui/system";
import AlbumList from "./AlbumList";

const Home = () => {
  return (
    <Box display="flex" flexDirection={"column"}>
      <Navbar />
      <Hero />
      <AlbumList title="Songs" />

      <AlbumList title="Top Albums" />
      <AlbumList title="New Albums" />
    </Box>
  );
};

export default Home;
