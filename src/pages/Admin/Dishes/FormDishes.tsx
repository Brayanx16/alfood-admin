import IRestaurant from "../../../interfaces/IRestaurant";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../../../http";
import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import IDish from "../../../interfaces/IDish";
import ITag from "../../../interfaces/ITag";
import { Method } from "axios";

const FormDishes = () => {
  const params = useParams();
  const [ListTags, setListTags] = useState<ITag[]>([]);
  const [ListRestaurants, setListRestaurants] = useState<IRestaurant[]>([]);
  const navigate = useNavigate();

  const [DName, setDName] = useState("");
  const [DDescription, setDDescription] = useState("");
  const [DTag, setDTag] = useState("");
  const [DRestaurant, setDRestaurant] = useState("");
  const [DImage, setDImage] = useState<File | string | null>(null);

  useEffect(() => {
    http
      .get<{ tags: ITag[] }>(`tags/`)
      .then((res) => {
        setListTags(res.data.tags);
      })
      .catch((err) => {
        console.error(err);
      });

    http
      .get<IRestaurant[]>(`restaurantes/`)
      .then((res) => {
        setListRestaurants(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (params.id)
      http
        .get<IDish>(`pratos/${params.id}/`)
        .then((res) => {
          setDName(res.data.nome);
          setDDescription(res.data.descricao);
          setDTag(res.data.tag);
          setDRestaurant(String(res.data.restaurante));
        })
        .catch((err) => {
          console.error(err);
        });
  }, [params]);

  const SubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nome", DName);
    formData.append("descricao", DDescription);
    formData.append("tag", DTag);
    formData.append("restaurante", DRestaurant);
    if (DImage) formData.append("imagem", DImage);

    let url = "/pratos/";
    let method: Method = "POST";

    if (params.id) {
      url += `${params.id}/`;
      method = "PUT";
    }

    http
      .request({
        url,
        method,
        headers: { "Content-Type": "multipart/form-data" },
        data: formData,
      })
      .then((res) => {
        if (!params.id) clearForm();
        else navigate(-1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const selectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.files?.length
      ? setDImage(event.target.files[0])
      : setDImage(null);
  };

  const clearForm = () => {
    setDName("");
    setDDescription("");
    setDTag("");
    setDRestaurant("");
    setDImage(null);
  };

  return (
    <>
      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                flexGrow: 1,
              }}
            >
              <Typography component="h1" variant="h6">
                Formulário de Pratos
              </Typography>
              <Box
                sx={{ width: "100%" }}
                component="form"
                onSubmit={SubmitForm}
              >
                <TextField
                  id="prato--name"
                  label="Nome"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                  value={DName}
                  onChange={(event) => setDName(event.target.value)}
                />
                <TextField
                  id="dishe--descricao"
                  label="Descrição"
                  variant="standard"
                  fullWidth
                  required
                  margin="dense"
                  value={DDescription}
                  onChange={(event) => setDDescription(event.target.value)}
                />
                <FormControl margin="dense" fullWidth>
                  <InputLabel id="dishe--tag"> Tags </InputLabel>
                  <Select
                    labelId="dishe--tag"
                    value={DTag}
                    onChange={(event) => setDTag(event.target.value)}
                    required
                  >
                    {ListTags.map((tag) => (
                      <MenuItem key={tag.id} value={tag.value}>
                        {tag.value}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl margin="dense" fullWidth>
                  <InputLabel id="dishe--restaurant"> Restaurantes </InputLabel>
                  <Select
                    labelId="dishe--restaurant"
                    value={DRestaurant}
                    onChange={(event) => setDRestaurant(event.target.value)}
                    required
                  >
                    {ListRestaurants.map((restaurant) => (
                      <MenuItem key={restaurant.id} value={restaurant.id}>
                        {restaurant.nome}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <input type="file" onChange={selectFile} />

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
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default FormDishes;
