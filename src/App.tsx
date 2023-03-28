import ListRestaurants from "./pages/Admin/Restautants/ListRestaurants";
import FormRestaurants from "./pages/Admin/Restautants/FormRestaurants";
import { Routes, Route } from "react-router-dom";
import Showcase from "./pages/Showcase";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Showcase />} />
      <Route path="/admin/restaurants" element={<ListRestaurants />} />
      <Route path="/admin/restaurants/new" element={<FormRestaurants />} />
      <Route path="/admin/restaurant/:id" element={<FormRestaurants />} />
    </Routes>
  );
}

export default App;
