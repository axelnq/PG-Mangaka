import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Actions/index";
import Snackbar, { initialSnack } from "./Snackbar";
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

//css
import "animate.css";
//validar email
const regEmail = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);

const initialForm = {
	newEmail: "",
	password: "",
};

const Email = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state);
	const [snack, setSnack] = React.useState(initialSnack);
	const [form, setForm] = useState(initialForm);
	const [show, setShow] = React.useState(false);
	const handleClickShowPassword = () => {
		setShow(!show);
	};
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setSnack(initialSnack);
		if (regEmail.test(form.newEmail)) {
			axios
				.put("http://localhost:3001/api/profile/updateEmail", form, {
					withCredentials: true,
				})

				.then((res) => {
					setSnack({ message: res.data.message, type: "success" });
					dispatch(getUser());
				})
				.catch((error) => console.log(error));
			setForm(initialForm);
		} else {
			setSnack({
				type: "error",
				message: "Email inválido",
			});
		}
	};
	return (
		<Box
			className="animate__animated animate__fadeInUp animate_slower"
			sx={{ width: "100%" }}
			component="form"
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<Typography variant="h4">Cambiar Email</Typography>
			<Typography variant="h6">Email Actual: {user.email}</Typography>
			<TextField
				fullWidth
				sx={{
					backgroundColor: "white",
					borderRadius: "5px 5px 0 0",
					my: 2,
				}}
				label="Email"
				variant="filled"
				name="newEmail"
				type="email"
				value={form.newEmail}
				onChange={handleChange}
				required
			/>
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
					type={show ? "text" : "password"}
					value={form.password}
					onChange={handleChange}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								edge="end"
							>
								{show ? <VisibilityOff /> : <Visibility />}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>

			<Button sx={{ mt: 3 }} type="submit" variant="contained">
				Cambiar Email
			</Button>
			{snack.message && (
				<Snackbar type={snack.type} message={snack.message} />
			)}
		</Box>
	);
};

export default Email;