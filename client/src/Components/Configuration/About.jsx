import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Actions/index";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar, { initialSnack } from "./Snackbar";
//CSS
import "animate.css";

const About = () => {
	const dispatch = useDispatch();
	const { user } = useSelector((state) => state);
	//estado
	const [about, setAbout] = useState("");
	const [snack, setSnack] = useState(initialSnack);
	const handleChange = (e) => {
		setAbout(e.target.value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setSnack(initialSnack);
		if (about) {
			axios
				.put(
					`http://localhost:3001/api/profile/updateAbout`,
					{
						about,
					},
					{ withCredentials: true }
				)
				.then((res) => {
					setSnack({ type: "success", message: res.data.message });
					dispatch(getUser());
				})
				.catch((error) => console.log(error));
			setAbout("");
		} else {
			setSnack({
				type: "error",
				message: "Es necesario completar el About",
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
			<Typography variant="h4">Modificar About</Typography>
			<Typography variant="h6">About Actual</Typography>
			<Typography variant="body1" gutterBottom>
				{user.about}
			</Typography>
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
			{snack.message && (
				<Snackbar type={snack.type} message={snack.message} />
			)}
		</Box>
	);
};

export default About;