import Showcase from "./pages/Showcase";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Showcase />} />
    </Routes>
  );
}

export default App;
