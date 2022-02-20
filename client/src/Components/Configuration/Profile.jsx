import React, { useEffect } from "react";
import axios from "axios";
import { getUser } from "../../Actions/index";
import { useDispatch, useSelector } from "react-redux";
//MUI
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Badge from "@mui/material/Badge";
import EditIcon from "@mui/icons-material/Edit";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
//router
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;
//input file
const Input = styled("input")({
  display: "none",
});
//buffer
const _ArrayBufferToBase64 = (buffer) => {
  //console.log(buffer)
  var binary = "";
  var byte = new Uint8Array(buffer.data);
  var length = byte.byteLength;

  for (var i = 0; i < length; i++) {
    binary += String.fromCharCode(byte[i]);
  }
  return window.btoa(binary);
};

function Profile(props) {
  //Redux
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/profile/", { withCredentials: true })
      .then((res) => console.log(res.data))
      .catch((error) => console.log(error));
  }, []);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleImage = (e) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);
    axios
      .put("http://localhost:3001/api/profile/updateAvatar", formData, {
        withCredentials: true,
      })
      .then((res) => {
        alert(res.data.message);
        return dispatch(getUser());
      })
      .catch((error) => console.log(error));
  };

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
            badgeContent={
              <label htmlFor="icon-button-file">
                <Input
                  onChange={handleImage}
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                />
                <IconButton aria-label="upload picture" component="span">
                  <EditIcon />
                </IconButton>
              </label>
            }
          >
            <Avatar
              alt="Usuario"
              src={
                "data:image/jpeg;base64," + _ArrayBufferToBase64(user.avatar)
              }
              sx={{ width: 200, height: 200, border: "5px solid #357DED" }}
            />
          </Badge>
          <Typography variant="h5" color="white" sx={{ textAlign: "center" }}>
            {user.name}
          </Typography>
        </Stack>
      </Toolbar>
      <Divider sx={{ bgcolor: "#357DED" }} />
      <Typography variant="h6" color="#357DED" sx={{ textAlign: "center" }}>
        Información Personal
      </Typography>
      <List>
        <Link
          to="/profile/name"
          style={{ textDecoration: "none", color: "white" }}
        >
          <ListItem button>
            <ListItemText primary={"Name"} />
          </ListItem>
        </Link>

        {user.googleId ? (
          <Link
            to="/profile/googleusername"
            style={{ textDecoration: "none", color: "white" }}
          >
            <ListItem button>
              <ListItemText primary={"Username"} />
            </ListItem>
          </Link>
        ) : (
          <>
            <Link
              to="/profile/username"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem button>
                <ListItemText primary={"Username"} />
              </ListItem>
            </Link>
            <Link
              to="/profile/password"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem button>
                <ListItemText primary={"Password"} />
              </ListItem>
            </Link>
            <Link
              to="/profile/email"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem button>
                <ListItemText primary={"Email"} />
              </ListItem>
            </Link>
          </>
        )}
        <Link
          to="/profile/about"
          style={{ textDecoration: "none", color: "white" }}
        >
          <ListItem button>
            <ListItemText primary={"About"} />
          </ListItem>
        </Link>
      </List>
      <Divider sx={{ bgcolor: "#357DED" }} />
      <List>
        <Link
          to="/profile/personalmangas"
          style={{ textDecoration: "none", color: "white" }}
        >
          <ListItem button>
            <ListItemIcon>
              <LocalLibraryIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary={"Mis Mangas"} />
          </ListItem>
        </Link>
        {/*renderizado de Prueba*/}
        {user.role === "USER" && (
          <>
            <Link
              to="/profile/panel"
              style={{ textDecoration: "none", color: "white" }}
            >
              <ListItem button>
                <ListItemIcon>
                  <AdminPanelSettingsIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary={"Admin Panel"} />
              </ListItem>
            </Link>
          </>
        )}
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
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button variant="outlined" sx={{ height: { xs: "90%" } }}>
              Volver a home
            </Button>
          </Link>
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

export default Profile;
