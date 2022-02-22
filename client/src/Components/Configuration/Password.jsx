import React, { useState } from "react";
import axios from "axios";
import Snackbar, { initialSnack } from "./Snackbar";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";

//styles css
import "animate.css";
//validación de contraseña
const regPass = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,15}$/
);
//formulario por default
const initialForm = {
	password: "",
	newPassword: "",
};

export default function Password() {
	//creación de estado
	const [passwords, setPasswords] = useState(initialForm);
	const [error, setError] = useState(false);
	//mostrar contraseñas
	const [show, setShow] = React.useState({
		showPassword: false,
		showNewPassword: false,
	});
	const [snack, setSnack] = useState(initialSnack);
	//manejo de estado
	const handleChange = (e) => {
		const { name, value } = e.target;
		setPasswords({ ...passwords, [name]: value });
		regPass.test(passwords.newPassword) ? setError(false) : setError(true);
	};

	//ver contraseña
	const handleClickShowPassword = (prop) => (e) => {
		setShow({ ...show, [prop]: !show[prop] });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		//validación de la contraseña

		if (passwords.password && passwords.newPassword) {
			axios
				.put(
					`http://localhost:3001/api/profile/updatePassword`,
					passwords,
					{ withCredentials: true }
				)
				.then((res) =>
					setSnack({ type: "success", message: res.data.message })
				)
				.catch((error) => console.log(error));
			setPasswords(initialForm);
		} else {
			setSnack({
				type: "error",
				message: "Ambos campos deben ser llenados",
			});
		}
	};

	return (
		<Box className="animate__animated animate__fadeInUp animate_slower">
			<Box component="form" onSubmit={handleSubmit} autoComplete="off">
				<Typography variant="h4">Cambiar Contraseña</Typography>

				<FormControl
					required
					fullWidth
					sx={{
						mt: 2,
						backgroundColor: "white",
						borderRadius: "5px 5px 0 0",
					}}
					variant="filled"
				>
					<InputLabel htmlFor="filled-adornment-password">
						Contraseña Actual
					</InputLabel>
					<FilledInput
						id="filled-adornment-password"
						name="password"
						type={show.showPassword ? "text" : "password"}
						value={passwords.password}
						onChange={handleChange}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword(
										"showPassword"
									)}
									edge="end"
								>
									{show.showPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>

				<FormControl
					error={error}
					required
					fullWidth
					sx={{
						mt: 2,
						backgroundColor: "white",
						borderRadius: "5px 5px 0 0",
					}}
					variant="filled"
				>
					<InputLabel htmlFor="filled-adornment-repeated-password">
						Nueva Contraseña
					</InputLabel>
					<FilledInput
						required
						id="filled-adornment-repeated-password"
						name="newPassword"
						type={show.showNewPassword ? "text" : "password"}
						value={passwords.newPassword}
						onChange={handleChange}
						endAdornment={
							<InputAdornment position="end">
								<IconButton
									aria-label="toggle password visibility"
									onClick={handleClickShowPassword(
										"showNewPassword"
									)}
									edge="end"
								>
									{show.showNewPassword ? (
										<VisibilityOff />
									) : (
										<Visibility />
									)}
								</IconButton>
							</InputAdornment>
						}
					/>
				</FormControl>
				{error && (
					<p
						style={{
							backgroundColor: "#D0342C",
							fontSize: "16px",
							color: "white",
							borderRadius: "0px 0px 5px 5px",
						}}
					>
						La contraseña debe tener 8 carácteres, al menos un
						número, una minúscula, una mayúscula, un símbolo
					</p>
				)}
				<Button sx={{ mt: 3 }} variant="contained" type="submit">
					Cambiar Contraseña
				</Button>
			</Box>
			{snack.message && (
				<Snackbar type={snack.type} message={snack.message} />
			)}
		</Box>
	);
}