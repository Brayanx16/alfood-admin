import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import IRestaurant from "../../../interfaces/IRestaurant";

const FormRestaurants = () => {
  const params = useParams();
  const [RName, setRName] = useState("");

  useEffect(() => {
    if (params.id)
      axios
        .get<IRestaurant>(
          `http://localhost:8000/api/v2/restaurantes/${params.id}/`
        )
        .then((res) => {
          setRName(res.data.nome);
        })
        .catch((err) => {
          console.error(err);
        });
  }, [params]);

  const SubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (params.id)
      axios
        .put(`http://localhost:8000/api/v2/restaurantes/${params.id}/`, {
          nome: RName,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    else
      axios
        .post("http://localhost:8000/api/v2/restaurantes/", { nome: RName })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
  };

  return (
    <form onSubmit={SubmitForm}>
      <TextField
        id="restaurant--name"
        label="Nome"
        variant="standard"
        value={RName}
        onChange={(event) => setRName(event.target.value)}
      />
      <Button type="submit" variant="outlined">
        Salvar
      </Button>
    </form>
  );
};

export default FormRestaurants;
