import React, { useEffect } from "react";
//import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";

//MUI
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import List from "@mui/material/List";
//import ListItem from "@mui/material/ListItem";
//import ListItemIcon from "@mui/material/ListItemIcon";
//import ListItemText from "@mui/material/ListItemText";

export default function PersonalMangas() {
  //const { user } = useSelector((state) => state);
  //const [data, setData] = useState(null);
  //const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile/")
      .then((res) => {
        console.log(res.data)
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>hola</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List>
            {/*data.genre.sort().map((text, index) => (
              <Link
                to={`/`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItem button key={index}>
                  <ListItemText primary={text} />
                </ListItem>
              </Link>
            ))*/}
          </List>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion disabled>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>Disabled Accordion</Typography>
        </AccordionSummary>
      </Accordion>
      <Link
        to="/createChapters"
        style={{ textDecoration: "none", color: "white" }}
      >
        <Button variant="contained" sx={{ width: "30%", mx: 1 }}>
          Crear Capitulos
        </Button>
      </Link>
    </div>
  );
}
