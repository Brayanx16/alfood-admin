import { Box, Button, TextField, Typography } from "@mui/material";
import IRestaurant from "../../../interfaces/IRestaurant";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../http";

const FormRestaurants = () => {
  const params = useParams();
  const [RName, setRName] = useState("");

  useEffect(() => {
    if (params.id)
      http
        .get<IRestaurant>(`restaurantes/${params.id}/`)
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
      http
        .put(`restaurantes/${params.id}/`, {
          nome: RName,
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    else
      http
        .post("restaurantes/", { nome: RName })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Typography component="h1" variant="h6">
        Formulário de Restaurantes
      </Typography>
      <Box component="form" onSubmit={SubmitForm}>
        <TextField
          id="restaurant--name"
          label="Nome"
          variant="standard"
          fullWidth
          required
          value={RName}
          onChange={(event) => setRName(event.target.value)}
        />
        <Button
          sx={{ marginTop: 1 }}
          type="submit"
          fullWidth
          variant="outlined"
        >
          Salvar
        </Button>
      </Box>
    </Box>
  );
};

export default FormRestaurants;
