import React from 'react'
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';
const IndexProfile = () => {
	return (
		<Box>
			<Link to="/create" style={{ textDecoration: "none", color: "white" }}>
			<Button variant="contained">Crear Manga</Button>
			</Link>
		</Box>
	)
}

export default IndexProfile