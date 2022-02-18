import React, { useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "animate.css";

const About = () => {
	//estado
	const [about, setAbout] = useState("");
	const handleChange = (e) => {
		setAbout(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if (about) {
			axios
				.put("http://localhost:3001/api/profile/updateAbout", {
					about,
				})
				.then((res) => alert(res.message))
				.catch((error) => console.log(error));
		} else {
			alert("Es necesario completar el About");
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
			<Typography variant="h4">Modificar About</Typography>

			<TextField
				sx={{ width: "100%", my: 3 }}
				id="filled-textarea"
				label="Sobre mí..."
				placeholder="Placeholder"
				value={about}
				onChange={handleChange}
				multiline
				variant="filled"
			/>
			<Button type="submit" variant="contained">
				Modificar About
			</Button>
		</Box>
	);
};

export default About;
