import React, {useState} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";

const Input = styled(InputBase)`
  width: 100%;
  border-radius: 3px 0 0 3px;
  border: none;
  padding-left: 10px;
  background-color: white;
  color: grey;
`;
const SearchButton = styled(Button)`
  border-radius: 0 3px 3px 0;
  border: none;
  background-color: #357ded;
`;
export default function NavBar() {
  const [search, setSearch] = useState("");
  const handleChange = (e)=>{
    setSearch(e.target.value);
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    //dispatch action
    alert(search)
    setSearch("")
  }
  return (
    <Box>
      <AppBar sx={{ backgroundColor: "#192a45", padding: { xs: "15px" } }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            my: "5px",
            mx: "10px",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            >
            MANGAKA
          </Typography>
          
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", width: { lg: "40vw" } }}>
              <Input placeholder="Search..." value={search} onChange={handleChange}/>
              <SearchButton type="submit">
                <SearchIcon />
              </SearchButton>
            </Box>
            <Stack direction="row" spacing={2} justifyContent="center">
              <Button variant="outlined">Iniciar Sesión</Button>
              <Button variant="outlined">Registrarse</Button>
            </Stack>
          </Stack>
        </Box>
      </AppBar>
    </Box>
  );
}
