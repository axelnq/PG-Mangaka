import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getMangasPreview, searchManga } from "../Actions/index";
import PerfilNavbar from "./PerfilNavbar";
//MUI
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InputBase from "@mui/material/InputBase";

//styles
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
const MoneyButton = styled("button")`
  height: 32px;
  width: 32px;
  border: none;
  cursor: pointer;
  margin-top: 5px;
  background-color: #daa520;
  border-radius: 50px;
  transition: 0.2;
  &:hover {
    background-color: #f0e68c;
  }
`;
const List = styled("ul")`
  padding: 0;
  list-style-position: inside;
  list-style-type: none;
  position: absolute;
  margin: 0;
  width: 100%;
  max-height: 200px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 5px 15px;
  overflow: hidden;
  overflow-y: auto;
  li {
    display: flex;
    flex-direction: row;
    margin: 0;
    height: 100%;
    &:hover {
      background-color: #3333;
    }
    img {
      width: 60px;
      height: 100px;
    }
  }
`;

export default function NavBar() {
  //redux
  const mangasPreview = useSelector((state) => state.mangasPreview);
  const dispatch = useDispatch();
  //bring the array to preview in the autocomplete filter
  useEffect(() => {
    dispatch(getMangasPreview());
  }, [mangasPreview]);

  //local state
  const [filteredData, setFilteredData] = useState([]);
  const [search, setSearch] = useState("");
  const [showAvatar, setShowAvatar] = useState(false);
  //filtering the autocomplete
  const handleFilter = (e) => {
    const word = e.target.value;
    setSearch(word);
    if (!word) {
      setFilteredData([]);
    } else {
      const newFilter = mangasPreview.filter((m) =>
        m.title.toLowerCase().includes(word.toLowerCase())
      );
      setFilteredData(newFilter);
    }
  };
  //searching manga
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      dispatch(searchManga(search));
      setFilteredData([]);
      setSearch("");
    }
  };
  return (
    <Box>
      <AppBar
        position="sticky"
        sx={{ backgroundColor: "#192a45", padding: { xs: "15px" } }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: { xs: "column", md: "row" },
            my: "5px",
            mx: "10px",
          }}
        >
          <Typography variant="h5" color="primary">
            MANGAKA
          </Typography>

          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                width: { lg: "50vw", md: "40vw" },
                flexDirection: "column",
              }}
            >
              <Stack direction="column">
                <Stack direction="row">
                  <Input
                    placeholder="Search..."
                    value={search}
                    onChange={handleFilter}
                  />
                  <SearchButton type="submit">
                    <SearchIcon />
                  </SearchButton>
                </Stack>
                <Box
                  sx={{
                    position: "relative",
                    width: "90%",
                    zIndex: 100,
                    color: "black",
                  }}
                >
                  {filteredData.length > 0 && (
                    <List>
                      {filteredData.map((m, i) => {
                        return (
                          <Link
                            style={{
                              color: "black",
                              fontSize: "16px",
                              textDecoration: "none",
                            }}
                            to={"/detail/" + m.id}
                          >
                            <li key={i}>
                              <img src={m.images[0]} alt={m.title} />
                              <div
                                style={{ display: "flex", alignSelf: "center" }}
                              >
                                <p
                                  style={{
                                    margin: "0 auto",
                                    textAlign: "center",
                                    marginLeft: "7px",
                                  }}
                                >
                                  {m.title}
                                </p>
                              </div>
                            </li>
                          </Link>
                        );
                      })}
                    </List>
                  )}
                </Box>
              </Stack>
            </Box>
            {showAvatar ? (
              <Stack direction="row" spacing={2} justifyContent="center">
                <MoneyButton>
                  <AttachMoneyIcon />
                </MoneyButton>
                <PerfilNavbar />
              </Stack>
            ) : (
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="outlined"
                  onClick={() => setShowAvatar(!showAvatar)}
                >
                  Iniciar Sesión
                </Button>
                <Button variant="outlined">Registrarse</Button>
              </Stack>
            )}
          </Stack>
        </Box>
      </AppBar>
    </Box>
  );
}
