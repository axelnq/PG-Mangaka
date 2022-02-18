import * as React from "react";
//import axios from "axios";
//MUI
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";

//router
import { Link, Outlet } from "react-router-dom";
//Redux
import {useSelector} from 'react-redux';
const drawerWidth = 240;

function ResponsiveDrawer(props) {
  const {user} = useSelector(state => state);
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  //const [image, setImage] = useState(null);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  /*
  const handleSubmit = (e) =>{
    const formData = new FormData();
    formData.append('image', image)

  }*/
  const drawer = (
    <div
      style={{ backgroundColor: "#192a45", height: "100vh", color: "white" }}
    >
      <Toolbar sx={{ pt: 1 }}>
        <Stack direction="column">
          <Badge
            color="primary"
            overlap="circular"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            badgeContent={<EditIcon onClick={() => alert("has cambiao la foto")} />}
          >
            <Avatar
              alt="Usuario"
              src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAGF-l7-D-wlaC1NXZfZjfu78E6dERN22CylzAGOiOQ%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1"
              sx={{ width: 200, height: 200, border: "5px solid #357DED" }}
            />
          </Badge>
          <Typography variant="h5" color="white" sx={{ textAlign: "center" }}>
            {user ? user.name : "Francisco Machuca"}
          </Typography>
        </Stack>
      </Toolbar>
      <Divider sx={{ bgcolor: "#357DED" }} />
      <Typography variant="h6" color="#357DED" sx={{ textAlign: "center" }}>
        Información Personal
      </Typography>
      <List>
        {["Name", "Password", "About", "Email", "Username"].sort().map((text, index) => (
          <Link to={`/profile/${text.toLowerCase()}`} style={{textDecoration: "none", color: "white"}}>
            <ListItem button key={index}>
              {/*<ListItemIcon>
            </ListItemIcon>*/}
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider sx={{ bgcolor: "#357DED" }} />
      <List>
      <Link to="profile/personalmangas" style={{textDecoration: "none", color: "white"}}>
        <ListItem button>
          <ListItemIcon>
            <LocalLibraryIcon color="primary" />
          </ListItemIcon>
          <ListItemText primary={"Mis Mangas"} />
        </ListItem>
        </Link>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "#192a45",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h4" noWrap component="div">
            Configuración
          </Typography>
          <Button variant="outlined">Volver a home</Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;
