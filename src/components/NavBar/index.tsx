import style from "./NavBar.module.scss";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className={style.Link}>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/restaurants">Restaurantes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
