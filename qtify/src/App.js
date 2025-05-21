import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import AudioDetail from "./components/AudioDetail";
import theme from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/audio-detail" element={<AudioDetail />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
