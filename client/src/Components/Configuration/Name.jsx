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

const Name = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state);
	const [newName, setName] = useState("");
	const [snack, setSnack] = useState(initialSnack)
	const handleChange = (e) => {
		setName(e.target.value);
	};
	const handleSubmitName = (e) => {
		e.preventDefault();
		setSnack(initialSnack);
		console.log(newName);
		if (newName) {
			axios
				.put(
					`http://localhost:3001/api/profile/updateName`,
					{ newName },
					{ withCredentials: true }
				)
				.then((res) =>{
					setSnack({type: "success", message: res.data.message})
					return dispatch(getUser());
				})
				.catch((error) => console.log(error));
				setName("");
		} else {
			setSnack({type:"error", message: "Introduzca un nombre"});
		}
	};

	return (
		<Box className="animate__animated animate__fadeInUp animate_slower">
			<Box
				sx={{ width: "100%" }}
				component="form"
				onSubmit={handleSubmitName}
				autoComplete="off"
			>
				<Typography variant="h4">Cambiar Nombre</Typography>
				<Typography variant="h6">Nombre Actual: {user.name}</Typography>
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
					value={newName}
					onChange={handleChange}
					required
				/>

				<Button type="submit" variant="contained">
					Cambiar Nombre
				</Button>
			</Box>
			{snack.message && <Snackbar type={snack.type} message={snack.message} />}
		</Box>
	);
};

export default Name;
