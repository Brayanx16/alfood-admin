import { useEffect, useState } from "react";
import IRestaurant from "../../interfaces/IRestaurant";
import style from "./ListRestaurant.module.scss";
import Restaurant from "./Restaurant";
import axios, { AxiosRequestConfig } from "axios";
import { IPagination } from "../../interfaces/IPagination";

interface ISearchParams {
  ordering?: string;
  search?: string;
}

const ListRestaurant = () => {
  const [restaurants, setRestaurant] = useState<IRestaurant[]>([]);
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  const searchData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const option = {
      params: {
        ordering: "nome",
        search: "",
      } as ISearchParams,
    };
    if (search) option.params.search = search;
    fetchData("http://localhost:8000/api/v1/restaurantes/", option);
  };

  const fetchData = (url: string, option: AxiosRequestConfig = {}) => {
    axios
      .get<IPagination<IRestaurant>>(url, option)
      .then((res) => {
        setRestaurant(res.data.results);
        setPreviousPage(res.data.previous);
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
      <form onSubmit={searchData}>
        <input
          type="text"
          value={search}
          onChange={(evento) => setSearch(evento.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {restaurants?.map((item) => (
        <Restaurant restaurante={item} key={item.id} />
      ))}
      {
        <button
          onClick={() => fetchData(previousPage)}
          disabled={!previousPage}
        >
          Página Anterior
        </button>
      }
      {
        <button onClick={() => fetchData(nextPage)} disabled={!nextPage}>
          Próxima página
        </button>
      }
    </section>
  );
};

export default ListRestaurant;
