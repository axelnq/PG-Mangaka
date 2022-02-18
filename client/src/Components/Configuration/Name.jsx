import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "animate.css";

const Name = () => {
	const [name, setName] = useState("");
	const handleChange = (e) => {
		setName(e.target.value);
	};
	const handleSubmitName = (e) => {
		e.preventDefault();
		if (name) {
			axios
				.put("http://localhost:3001/api/profile/updateName", { name })
				.then((res) => alert(res.message))
				.catch((error) => console.log(error));
		} else {
			alert("Introduzca un nombre");
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
					value={name}
					onChange={handleChange}
					required
				/>
				
				<Button type="submit" variant="contained">
					Cambiar Nombre
				</Button>
			</Box>
		</Box>
	);
};

export default Name;
