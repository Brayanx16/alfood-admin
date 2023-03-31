import IDish from "../../../interfaces/IDish";
import { useEffect, useState } from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import http from "../../../http";

const ListDishes = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);

  useEffect(() => {
    http
      .get<IDish[]>("pratos/")
      .then((res) => {
        setDishes(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const excluirItem = (disheId: number) => {
    http
      .delete(`pratos/${disheId}/`)
      .then((res) => {
        const ListDishes = dishes.filter((item) => item.id !== disheId);
        setDishes([...ListDishes]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Tag</TableCell>
            <TableCell>Imagem</TableCell>
            <TableCell>Editar</TableCell>
            <TableCell>Excluir</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dishes.map((item) => (
            <TableRow
              key={item.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.nome}
              </TableCell>
              <TableCell component="th" scope="row">
                {item.tag}
              </TableCell>
              <TableCell component="th" scope="row">
                <a href={item.imagem} target="_blank" rel="noreferrer">
                  Ver Imagem
                </a>
              </TableCell>
              <TableCell>
                [ <Link to={`/admin/dishe/${item.id}`}> Editar </Link> ]
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => excluirItem(item.id)}
                >
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ListDishes;
