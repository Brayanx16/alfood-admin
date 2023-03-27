import IRestaurant from "../../../interfaces/IRestaurant";
import style from "./Restaurant.module.scss";
import Dish from "../Dish";

interface RestaurantProps {
  restaurante: IRestaurant;
}

const Restaurant = ({ restaurante }: RestaurantProps) => {
  return (
    <section className={style.Restaurante}>
      <div className={style.Titulo}>
        <h2>{restaurante.nome}</h2>
      </div>
      <div>
        {restaurante.pratos?.map((item) => (
          <Dish prato={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default Restaurant;
