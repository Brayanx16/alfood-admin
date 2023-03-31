import { Link as RouterLink, Outlet } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";

const PageDefault = () => {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <Typography variant="h6"> Adminitração </Typography>
            <Box sx={{ display: "flex", flexGrow: 1 }}>
              <Link component={RouterLink} to={"/admin/restaurants/"}>
                <Button sx={{ my: 2, color: "white" }}>Restaurantes</Button>
              </Link>
              <Link component={RouterLink} to={"/admin/restaurants/new"}>
                <Button sx={{ my: 2, color: "white" }}>Novo Restaurante</Button>
              </Link>
              <Link component={RouterLink} to={"/admin/dishes/"}>
                <Button sx={{ my: 2, color: "white" }}>Pratos</Button>
              </Link>
              <Link component={RouterLink} to={"/admin/dishes/new"}>
                <Button sx={{ my: 2, color: "white" }}>Novo Prato</Button>
              </Link>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box>
        <Container maxWidth="lg" sx={{ mt: 1 }}>
          <Paper sx={{ p: 2 }}>
            <Outlet />
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default PageDefault;
