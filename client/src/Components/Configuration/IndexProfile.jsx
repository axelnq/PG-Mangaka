import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
const IndexProfile = () => {
	const { user } = useSelector((state) => state);
	return (
		<Box>
			<Typography variant="h4">Bienvenido a Mangaka!</Typography>
			<Typography variant="body1" gutterBottom>
				Estamos muy contentos de que te unas a nuestra comunidad y que
				nos regales increíbles historias para leer. Pero antes de
				empezar es necesario que leas los requisitos:
			</Typography>
			<Box sx={{margin: "0 auto"}}>
			<ul style={{textAlign: "center", alignItems: "center"}}>
				<li>No publicar contenido pórnografico</li>
				<li>Condición 2</li>
				<li>Condición 3</li>
				<li>Condición 4</li>
				<li>Condición 5</li>
			</ul>
			</Box>
			<Typography variant="h4">Pagos</Typography>
			<Typography variant="body2">
				Para recibir tus pagos debes llenar el siguiente Formulario
			</Typography>
			<Link to={`/profile/CheckoutForm/${user.id}`}></Link>
			<Button variant="contained">Formulario de Pago</Button>
			<Typography variant="h5">Empieza a crear!</Typography>

			<Link
				to="/create"
				style={{ textDecoration: "none", color: "white" }}
			>
				<Button variant="contained" sx={{ width: "30%", mx: 1 }}>
					Crear Manga
				</Button>
			</Link>
			<Link
				to="/createChapters"
				style={{ textDecoration: "none", color: "white" }}
			>
				<Button variant="contained" sx={{ width: "30%", mx: 1 }}>
					Crear Capitulos
				</Button>
			</Link>
		</Box>
	);
};

export default IndexProfile;
