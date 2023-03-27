import { useEffect, useState } from "react";
import IRestaurant from "../../interfaces/IRestaurant";
import style from "./ListRestaurant.module.scss";
import Restaurant from "./Restaurant";
import axios from "axios";
import { IPagination } from "../../interfaces/IPagination";

const ListRestaurant = () => {
  const [restaurants, setRestaurant] = useState<IRestaurant[]>([]);
  const [nextPage, setNextPage] = useState("");

  useEffect(() => {
    axios
      .get<IPagination<IRestaurant>>(
        "http://localhost:8000/api/v1/restaurantes/"
      )
      .then((res) => {
        setRestaurant([...restaurants, ...res.data.results]);
        setNextPage(res.data.next);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const showMore = () => {
    axios
      .get<IPagination<IRestaurant>>(nextPage)
      .then((res) => {
        setRestaurant(res.data.results);
        setNextPage(res.data.next);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <section className={style.ListaRestaurantes}>
      <h1>
        Os restaurantes mais <em>bacanas</em>!
      </h1>
      {restaurants?.map((item) => (
        <Restaurant restaurante={item} key={item.id} />
      ))}
      {nextPage && <button onClick={showMore}> Ver mais </button>}
    </section>
  );
};

export default ListRestaurant;
