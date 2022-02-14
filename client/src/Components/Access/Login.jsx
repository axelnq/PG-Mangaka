import * as React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentUser } from "../../Actions/index";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import GoogleIcon from "@mui/icons-material/Google";
//import FacebookIcon from "@mui/icons-material/Facebook";
import Stack from "@mui/material/Stack";

const AccessButton = styled(Button)({
	width: "47%",
	boxShadow: "none",
	textTransform: "none",
	fontSize: 16,
	padding: "6px 12px",
	lineHeight: 1.5,
	backgroundColor: "#0063cc",
	color: "white",
	fontFamily: [
		"-apple-system",
		"BlinkMacSystemFont",
		'"Segoe UI"',
		"Roboto",
		'"Helvetica Neue"',
		"Arial",
		"sans-serif",
		'"Apple Color Emoji"',
		'"Segoe UI Emoji"',
		'"Segoe UI Symbol"',
	].join(","),
	"&:hover": {
		boxShadow: "none",
		backgroundColor: "lightblue",
	},
	"&:active": {
		boxShadow: "none",
	},
});

//valores del form
const initialForm = {
	username: "",
	password: "",
};

export default function Login({ handleClose }) {
	const dispatch = useDispatch();
	const [form, setForm] = React.useState(initialForm);
	//ver contraseña
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = (e) => {
		setShowPassword(!showPassword);
	};
	//inicio de sesión con google (redireccionamiento)
	const googleLogin = () => {
		window.open("http://localhost:3001/api/auth/google", "_self");
	};
	//control de los input
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	//submit del form
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(form);
		if (form.username && form.password) {
			dispatch(getCurrentUser(form));
			handleClose();
		} else {
			alert("llena todos los campos");
		}

		setForm(initialForm);
	};

	return (
		<Box
			id="login"
			sx={{ width: "100%" }}
			component="form"
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<Typography id="transition-modal-title" variant="h6">
				Inicia Sesión para empezar a leer!
			</Typography>
			<TextField
				fullWidth
				sx={{
					backgroundColor: "white",
					borderRadius: "5px 5px 0 0",
					my: 2,
				}}
				label="Username"
				variant="filled"
				name="username"
				type="text"
				value={form.username}
				onChange={handleChange}
				required
			/>
			<FormControl
				required
				fullWidth
				sx={{
					my: 2,
					backgroundColor: "white",
					borderRadius: "5px 5px 0 0",
				}}
				variant="filled"
			>
				<InputLabel htmlFor="filled-adornment-password">
					Password
				</InputLabel>
				<FilledInput
					id="filled-adornment-password"
					name="password"
					type={showPassword ? "text" : "password"}
					value={form.password}
					onChange={handleChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								edge="end"
							>
								{showPassword ? (
									<VisibilityOff />
								) : (
									<Visibility />
								)}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<Stack sx={{ width: "100%" }} direction="column" spacing={1}>
				<AccessButton sx={{ width: "100%" }} type="submit">
					Iniciar Sesión
				</AccessButton>
				<AccessButton sx={{ width: "100%", backgroundColor: "white" }}>
					<Link
						style={{ textDecoration: "none", color: "#0063cc" }}
						to="/register"
					>
						Registrarse
					</Link>
				</AccessButton>
			</Stack>
			<p
				style={{
					margin: "5px 0 2px 0",
					color: "#357ded",
					textAlign: "center",
				}}
			>
				O inicia sesión con:
			</p>
			<Divider sx={{ mb: 2, backgroundColor: "#357ded" }} />
			{/*
			<AccessButton
				sx={{ marginRight: "3%", borderRadius: 5 }}
				startIcon={<FacebookIcon />}
			>
				facebook
			</AccessButton>*/}

			<AccessButton
				sx={{
					backgroundColor: "red",
					color: "white",
					marginLeft: "3%",
					borderRadius: 5,
					"&:hover": { backgroundColor: "#ff726f" },
				}}
				onClick={googleLogin}
				startIcon={<GoogleIcon />}
			>
				Google
			</AccessButton>
		</Box>
	);
}
