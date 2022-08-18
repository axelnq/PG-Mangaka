import React, { useState } from "react";
import axios from "axios";
import {useDispatch, useSelector} from 'react-redux';
import {getUser} from '../../Actions/index';
import Snackbar, {initialSnack} from './Snackbar';
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
//CSS
import "animate.css";

const GoogleUsername = () => {
const dispatch = useDispatch();
	const { user } = useSelector((state) => state);
	const [newUsername, setUsername] = useState("");
	const [snack, setSnack] = useState(initialSnack);
	const handleChange = (e) => {
		setUsername(e.target.value);
	};
	const handleSubmitUsername = (e) => {
		e.preventDefault();
		setSnack(initialSnack);
		if (newUsername) {
			axios
				.put(
					`http://localhost:3001/api/profile/updateUsername`,
					{ newUsername },
					{ withCredentials: true }
				)
				.then((res) =>{
					setSnack({type: "success", message: res.data.message})
					dispatch(getUser());
				})
				.catch((error) => console.log(error));
				setUsername("");
		} else {
			setSnack({type:"error", message: "Introduzca un username"})
		}
	};

	return (
		<Box className="animate__animated animate__fadeInUp animate_slower">
			<Box
				sx={{ width: "100%" }}
				component="form"
				onSubmit={handleSubmitUsername}
				autoComplete="off"
			>
				<Typography variant="h4">Cambiar Username</Typography>
				<Typography variant="h6">Username Actual: {user.username}</Typography>
				<TextField
					fullWidth
					sx={{
						backgroundColor: "white",
						borderRadius: "5px 5px 0 0",
						my: 2,
					}}
					label="Nuevo Nombre"
					variant="filled"
					name="name"
					type="text"
					value={newUsername}
					onChange={handleChange}
					required
				/>

				<Button type="submit" variant="contained">
					Cambiar Username
				</Button>
			</Box>
			{snack.message && <Snackbar type={snack.type} message={snack.message} />}
		</Box>
	);
}

export default GoogleUsername