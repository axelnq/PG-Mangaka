import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";


import "animate.css";
const PersonalMangas = () => {
	const handleSubmit = () => {};
	return (
		<Box
			className="animate__animated animate__fadeInUp animate_slower"
			sx={{ width: "100%" }}
			component="form"
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<Typography variant="h6">Mis Mangas</Typography>
			
		</Box>
	);
};

export default PersonalMangas;
