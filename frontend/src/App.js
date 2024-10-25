import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Feedback from "./components/Feedback";
import Friends from "./components/Friends";
import Room from "./components/Room";
import Computer from "./components/Computer";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/friends" element={<Friends />} />
        <Route path="/room/:roomId" element={<Room />} />
        <Route path="/computer" element={<Computer />} />
      </Routes>
    </Router>
  );
}

export default App;
