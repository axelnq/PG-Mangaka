import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Actions/index";
import { Link } from "react-router-dom";
import axios from "axios";
//MUI
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";

const IndexProfile = () => {
	const { user } = useSelector((state) => state);
	const dispatch = useDispatch();
	//Funcionamiento del checkbox
	const [checked, setChecked] = React.useState(true);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		if(checked){
		axios
			.put("http://localhost:3001/api/profile/creator", {
				withCredentials: true,
			})
			.then((res) => {
				alert(res.data.message);
				return dispatch(getUser());
			})
			.catch((error) => console.log(error));
		}else{
			alert("Debe aceptar los términos y condiciones para empezar a crear");
		}
	};
	return (
		<Box>
			{user.creatorMode ? (
				<>
					<Typography variant="h4">
						Un placer volverte a ver en Mangaka {user.name}!
					</Typography>

					<Typography variant="h4">Pagos</Typography>
					<Typography variant="body2">
						Para recibir tus pagos debes llenar el siguiente
						Formulario:
					</Typography>
					<Link to={`/profile/CheckoutForm/${user.id}`}>
						<Button variant="contained">Formulario de Pago</Button>
					</Link>

					<Typography variant="h5">Crea tu manga!</Typography>
					<Link
						to="/create"
						style={{ textDecoration: "none", color: "white" }}
					>
						<Button
							variant="contained"
							sx={{ width: "30%", mx: 1 }}
						>
							Crear Manga
						</Button>
					</Link>
				</>
			) : (
				<Box
					component="form"
					onSubmit={handleSubmit}
					autoComplete="off"
				>
					<Typography variant="h4">
						Bienvenido a Mangaka {user.name}!
					</Typography>
					<Typography variant="body1" gutterBottom>
						Estamos muy contentos de que te unas a nuestra comunidad
						y que nos aportes increíbles historias para leer. Pero
						antes de empezar es necesario que aceptes nuestros
						términos y condiciones:
					</Typography>
					<Typography variant="h5">
						REGLAS PARA PUBLICAR TU MANGA:
					</Typography>
					<Box sx={{ margin: "0 auto", width: "250px" }}>
						<ol
							style={{
								listStyleType: "upper-roman",
								textAlign: "center",
								alignItems: "center",
							}}
						>
							<li>
								No publicar contenido pórnografico ni Hentai
							</li>
							<li>No publicar mangas ajenos ni ya existentes</li>
							<li>Sólo publicar mangas en español</li>
							<li>
								No está permitida la subida de volúmenes, tomos
								o agrupación de capítulos
							</li>
							<li>
								No se permite subidas duplicadas, capítulos
								incompletos
							</li>
						</ol>
					</Box>
					<Box sx={{ margin: "0 auto", width: "250px" }}>
						<Typography variant="h6">Pagos</Typography>
						<ul
							style={{
								listStyleType: "upper-roman",
								textAlign: "center",
								alignItems: "center",
							}}
						>
							<li>El sitio se maneja con una moneda propia</li>
							<li>
								Por cada manga que vendas el sitio se deja x%
							</li>
							<li>
								El intercambio de monedas a dinero real se
								realiza a través de un formulario
							</li>
							<li>
								Los días de cobro serán estipulados por el sitio
							</li>
							<li>El retiro se realiza mediante CBU</li>
						</ul>
					</Box>
					<FormGroup>
						<FormControlLabel
							control={
								<Checkbox
									checked={checked}
									onChange={handleChange}
									inputProps={{ "aria-label": "controlled" }}
								/>
							}
							label="Acepto los términos y condiciones"
						/>
					</FormGroup>

					<Button type="submit" variant="contained">
						Empieza a crear
					</Button>
				</Box>
			)}
		</Box>
	);
};

export default IndexProfile;
