import { useEffect, useState } from "react";
import IRestaurant from "../../interfaces/IRestaurant";
import style from "./ListRestaurant.module.scss";
import Restaurant from "./Restaurant";
import axios from "axios";

const ListRestaurant = () => {
  const [restaurants, setRestaurant] = useState<IRestaurant[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/restaurantes/")
      .then((res) => {
        setRestaurant(res.data.results);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurants?.map((item) => (
        <Restaurant restaurante={item} key={item.id} />
      ))}
    </section>
  );
};

export default ListRestaurant;
