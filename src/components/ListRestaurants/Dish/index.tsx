import IDish from "../../../interfaces/IDish";
import style from "./Dish.module.scss";

interface IDishProps {
  prato: IDish;
}

const Dish = ({ prato }: IDishProps) => {
  return (
    <div className={style.Prato}>
      <div className={style.Container}>
        <div>
          <div className={style.EfeitoTorcao}>
            <img src={prato.imagem} alt={prato.descricao} />
          </div>
        </div>
      </div>
      <div className={style.Conteudo}>
        <h3>{prato.nome}</h3>
        <div className={style.Tag}>{prato.tag}</div>
        <div>{prato.descricao}</div>
      </div>
    </div>
  );
};

export default Dish;
