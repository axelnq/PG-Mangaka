import * as React from "react";
import { useEffect } from "react";
import { UserLogout } from "../Actions/index";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
//MUI
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";

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

export default function PerfilNavbar() {
  //redux
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  //local state
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(UserLogout());
  };
  return (
    <React.Fragment>
      <Box>
        <Tooltip title="Configuración de Perfil">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar
              src={"data:image/jpeg;base64," + _ArrayBufferToBase64(user.avatar)}
              alt="perfil"
              sx={{ width: 32, height: 32 }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            bgcolor: "#192a45",
            color: "white",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "#192a45",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem>
        <Avatar
              src={"data:image/jpeg;base64," + _ArrayBufferToBase64(user.avatar)}
              alt="perfil"
              sx={{ width: 32, height: 32 }}
            />{" "}
          {user.username}
        </MenuItem>
        <Link to="/panel" style={{ textDecoration: "none", color: "white" }}>
          <MenuItem>Panel</MenuItem>
        </Link>
        <Link to="/wishlist" style={{ textDecoration: "none", color: "white" }}>
          <MenuItem>Wishlist</MenuItem>
        </Link>
        <Link to="/library" style={{ textDecoration: "none", color: "white" }}>
          <MenuItem>Biblioteca</MenuItem>
        </Link>
        <Link
          to="/createChapters"
          style={{ textDecoration: "none", color: "white" }}
        >
          <MenuItem>Crear Capitulos</MenuItem>
        </Link>
        <Divider sx={{ backgroundColor: "#357ded" }} />
        <Link to="/create" style={{ textDecoration: "none", color: "white" }}>
          <MenuItem>
            <ListItemIcon>
              <MenuBookIcon fontSize="small" color="primary" />
            </ListItemIcon>
            Crea tu Manga!
          </MenuItem>
        </Link>
        <Divider sx={{ backgroundColor: "#357ded", mt: "5px" }} />
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" color="primary" />
          </ListItemIcon>
          Ajustes
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <Logout fontSize="small" color="primary" />
          </ListItemIcon>
          Cerrar Sesión
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
