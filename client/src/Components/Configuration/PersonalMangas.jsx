import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//MUI
import AddBoxIcon from "@mui/icons-material/AddBox";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CircularProgress from "@mui/material/CircularProgress";
import "animate.css";
export default function PersonalMangas() {
  const [mangas, setMangas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile/mangas", {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);
        setMangas(res.data.mangasCreated);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
        console.log(error);
      });
  }, []);
  return loading ? (
    <CircularProgress disableShrink />
  ) : !error ? (
    <Box className="animate__animated animate__fadeInUp animate_slower">
      {mangas.map((m) => {
        return (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>{m.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                <ListItem>
                  <ListItemText primary={`Capitulos creados: ${m.chapter}`} />
                </ListItem>
                <Link to={`/profile/createChapters/${m.id}`}>
                  <ListItem button>
                    <ListItemText primary={"Crear nuevo capitulo"} />
                    <ListItemIcon>
                      <AddBoxIcon color="primary" />
                    </ListItemIcon>
                  </ListItem>
                </Link>
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  ) : (
    <Typography variant="h4">NO HAY MANGAS CREADOS</Typography>
  );
}
