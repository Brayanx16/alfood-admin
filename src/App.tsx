import ListRestaurants from "./pages/Admin/Restautants/ListRestaurants";
import FormRestaurants from "./pages/Admin/Restautants/FormRestaurants";
import ListDishes from "./pages/Admin/Dishes/ListDishes";
import FormDishes from "./pages/Admin/Dishes/FormDishes";
import PageDefault from "./components/PageDefault";
import { Routes, Route } from "react-router-dom";
import Showcase from "./pages/Showcase";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/restaurants" element={<Showcase />} />
      <Route path="/admin" element={<PageDefault />}>
        <Route path="restaurants" element={<ListRestaurants />} />
        <Route path="restaurant/:id" element={<FormRestaurants />} />
        <Route path="restaurants/new" element={<FormRestaurants />} />

        <Route path="dishes" element={<ListDishes />} />
        <Route path="dishe/:id" element={<FormDishes />} />
        <Route path="dishes/new" element={<FormDishes />} />
      </Route>
    </Routes>
  );
}

export default App;
