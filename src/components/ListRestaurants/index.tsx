import { IPagination } from "../../interfaces/IPagination";
import IRestaurant from "../../interfaces/IRestaurant";
import style from "./ListRestaurant.module.scss";
import { useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import Restaurant from "./Restaurant";
import http from "../../http";

interface ISearchParams {
  ordering?: string;
  search?: string;
}

const ListRestaurant = () => {
  const [restaurants, setRestaurant] = useState<IRestaurant[]>([]);
  const [previousPage, setPreviousPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [ordering, setOrdering] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchData("http://localhost:8000/api/v1/restaurantes/");
  }, []);

  const searchData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const option = {
      params: {
        ordering: "",
        search: "",
      } as ISearchParams,
    };
    if (ordering) option.params.ordering = ordering;
    if (search) option.params.search = search;
    fetchData("http://localhost:8000/api/v1/restaurantes/", option);
  };

  const fetchData = (url: string, option: AxiosRequestConfig = {}) => {
    http
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
        <div>
          <input
            type="text"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="select-ordenacao">Ordenação</label>
          <select
            name="select-ordenacao"
            id="select-ordenacao"
            value={ordering}
            onChange={(event) => setOrdering(event.target.value)}
          >
            <option value="">Padrão</option>
            <option value="id">Por ID</option>
            <option value="nome">Por Nome</option>
          </select>
        </div>
        <div>
          <button type="submit">Buscar</button>
        </div>
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
