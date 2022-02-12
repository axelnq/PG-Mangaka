import * as React from "react";
import validation from "./Validation";
import { useForm } from "./useForm";
import { Link } from "react-router-dom";
//MUI
import Stack from "@mui/material/Stack";
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

//styled button
const RegisterButton = styled(Button)({
	width: "100%",
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
const initialForm = {
	username: "",
	name: "",
	email: "",
	password: "",
	repeatedPassword: "",
};

export default function Register() {
	const {
		form,
		errors,
		loading,
		response,
		handleChange,
		handleBlur,
		handleSubmit,
	} = useForm(initialForm, validation);

	const [passwords, setPasswords] = React.useState({
		showPassword: false,
		showRepeatedPassword: false,
	});

	const handleClickShowPassword = (prop) => (e) => {
		setPasswords({ ...passwords, [prop]: !passwords[prop] });
	};

	return (
		<Box sx={{margin: "0 auto", display: 'flex', justifyContent: "center"}}>
			<Link to="/">
			<Button sx={{position:"absolute", left: "20px", top:"20px"}} variant="outlined">Inicio</Button>
			</Link>
			<Box
				sx={{ width: { xs: "90vw", md: "45vw" }, margin:"0 auto", mt: 8}}
				component="form"
				onSubmit={handleSubmit}
				autoComplete="off"
			>
				<Typography id="transition-modal-title" variant="h6">
					Registrate para empezar a leer!
				</Typography>
				<Stack direction={{ md: "row" }} spacing={2}>
					<TextField
						fullWidth
						name="username"
						type="text"
						sx={{
							backgroundColor: "white",
							borderRadius: "5px 5px 0 0",
							mt: { sx: 2, md: 0 },
						}}
						label="Username"
						variant="filled"
						value={form.username}
						onChange={handleChange}
						onBlur={handleBlur}
						required
					/>
					<TextField
						fullWidth
						name="name"
						type="text"
						sx={{
							backgroundColor: "white",
							borderRadius: "5px 5px 0 0",
							mt: 2,
						}}
						label="Full Name"
						variant="filled"
						value={form.name}
						onChange={handleChange}
						onBlur={handleBlur}
						required
					/>
				</Stack>
				<TextField
					error={errors.email ? true : false}
					fullWidth
					name="email"
					type="email"
					sx={{
						backgroundColor: "white",
						borderRadius: "5px 5px 0 0",
						mt: 2,
					}}
					label="Email"
					variant="filled"
					value={form.email}
					onChange={handleChange}
					onBlur={handleBlur}
					required
				/>
				{errors.email && (
					<p style={{ color: "red", fontSize: "12px" }}>{errors.email}</p>
				)}

				<FormControl
					required
					fullWidth
					sx={{ mt: 2, backgroundColor: "white", borderRadius: "5px 5px 0 0" }}
					variant="filled"
				>
					<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
					<FilledInput
						error={errors.password ? true : false}
						id="filled-adornment-password"
						name="password"
						type={passwords.showPassword ? "text" : "password"}
						value={form.password}
						onChange={handleChange}
						onBlur={handleBlur}
						helperText={errors.password}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword("showPassword")}
									edge="end"
								>
									{passwords.showPassword ? <VisibilityOff /> : <Visibility />}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				{errors.password && (
					<p
						style={{ margin: "10px 0 10px 0", color: "red", fontSize: "12px" }}
					>
						{errors.password}
					</p>
				)}
				<FormControl
					required
					fullWidth
					sx={{ my: 2, backgroundColor: "white", borderRadius: "5px 5px 0 0" }}
					variant="filled"
					helperText={errors.repeatedPassword}
				>
					<InputLabel htmlFor="filled-adornment-repeated-password">
						Repeat password
					</InputLabel>
					<FilledInput
						error={errors.repeatedPassword ? true : false}
						required
						id="filled-adornment-repeated-password"
						name="repeatedPassword"
						type={passwords.showRepeatedPassword ? "text" : "password"}
						value={form.repeatedPassword}
						onChange={handleChange}
						onBlur={handleBlur}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword("showRepeatedPassword")}
									edge="end"
								>
									{passwords.showRepeatedPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				{errors.repeatedPassword && (
					<p style={{ margin: "0 0 10px 0", color: "red", fontSize: "12px" }}>
						{errors.repeatedPassword}
					</p>
				)}
				<RegisterButton
					sx={
						Object.entries(errors).length === 0
							? { backgroundColor: "#0063cc", color: "white" }
							: { display: "none" }
					}
					type="submit"
				>
					Registrarse
				</RegisterButton>
				<Link
					to="/"
					style={{
						backgroundColor: "transparent",
						border: "none",
						cursor: "pointer",
						color: "#0063cc",
						fontSize: "16px",
						width: "100%",
						marginTop: "8px",
					}}
				>
					¿Ya estás registrado? Inicia sesión
				</Link>
			</Box>
		</Box>
	);
}
