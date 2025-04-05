import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:theme/:player/:grid" element={<Game />} />
      </Routes>
    </div>
  );
}
export default App;
