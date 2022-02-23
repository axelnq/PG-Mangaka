import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Actions/index";
import { Link } from "react-router-dom";
import Snackbar, { initialSnack } from "./Snackbar";
import axios from "axios";
//MUI
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import Divider from "@mui/material/Divider";
import { borderRadius } from "@mui/system";
const IndexProfile = () => {
	const { user } = useSelector((state) => state);
	const dispatch = useDispatch();
	//Funcionamiento del checkbox
	const [checked, setChecked] = React.useState(false);
	const [snack, setSnack] = React.useState(initialSnack);
	const handleChange = (event) => {
		setChecked(event.target.checked);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		setSnack(initialSnack);
		if (checked) {
			axios
				.put(
					"http://localhost:3001/api/profile/creator",
					{ creatorMode: checked },
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					setSnack({ type: "success", message: res.data.message });
					dispatch(getUser());
				})
				.catch((error) => console.log(error));
		} else {
			setSnack({
				type: "error",
				message:
					"Debe aceptar los términos y condiciones para empezar a crear",
			});
		}
	};
	return (
		<Container width='100%'>
		<Box>
			{user.creatorMode ? (
				<>
					<Typography variant="h4">
						Un placer volverte a ver en Mangaka {user.name}!
					</Typography>
					<Divider />
					<Typography variant="h4">Pagos</Typography>
					<Typography variant="body2">
						Para recibir tus pagos debes llenar el siguiente
						Formulario:
					</Typography>
					<Link to={`/profile/CheckoutForm/${user.id}`}>
						<Button variant="contained">Formulario de Pago</Button>
					</Link>
					<Divider />
					<Box sx={{ mt: 3 }}>
						<Typography variant="h5">Crea tu manga!</Typography>
						<Link
							to="/profile/create"
							style={{ textDecoration: "none", color: "white" }}
						>
							<Button
								variant="contained"
								sx={{ width: "50%", mx: 1 }}
							>
								Crear Manga
							</Button>
						</Link>
					</Box>
				</>
			) : (
				<Container sx={{xs: 3+'rem', sm: 9.8+'rem', md: 12.5+'rem', lg: 14.5 +'rem', xl: 16 +'rem'}}>
					<Box
						component="form"
						onSubmit={handleSubmit}
						autoComplete="off"
						display='flex'
						flexDirection='column'
						sx={{xs: '20%', md: '40%', lg: '100%'}}
						
					>
						<Box 
							sx={{width: "48rem", xs: 6.5+'rem', sm: 9.8+'rem', md: 12.5+'rem', lg: 14.5 +'rem', xl: 16 +'rem'}}
							display='flex'
							flexDirection='column'
							justifyContent='center'
							marginLeft='10rem'
							
						>
							<Typography variant="h4">
								Bienvenido a Mangaka {user.name}!
							</Typography>
							<Divider sx={{borderColor: '#1850AB'}}/>
							<Typography
								
								variant="body1"
								sx={{ textAlign: "center"}}
								gutterBottom
								>
								Estamos muy contentos de que te sumes a nuestra
								comunidad y que aportes increíbles historias para leer.
								Pero antes de empezar es necesario que aceptes nuestros
								términos y condiciones:
							</Typography>
						</Box>

							<Box
								margin='2rem'
								sx={{xs: 6.5+'rem', sm: 9.8+'rem', md: 12.5+'rem', lg: 14.5 +'rem', xl: 16 +'rem'}}
								display='flex'
								justifyContent='space-around'
							>
								<Box 
									sx={{ margin: "0 auto", width: "25rem", background:'#192A45', p:'1.5rem', borderRadius:'0.2rem'}}
									display='flex'
									flexDirection='column'
									justifyContent='space-around'	
								>

									<Typography 
										variant="h5"
										margin='1rem'
										color='#E2E9F3'
									>REGLAS PARA PUBLICAR TU MANGA:</Typography>

									<ol
										style={{
											listStyleType: "upper-roman",
											textAlign: "left",
											alignItems: "left",
											color:'#E2E9F3'
										}}
									>
										<li>No publicar contenido pórnografico ni Hentai</li>
										<li>No publicar mangas ajenos ni ya existentes</li>
										<li>Sólo publicar mangas en español</li>
										<li>No está permitida la subida de volúmenes, tomos	o agrupación de capítulos</li>
										<li>No se permite subidas duplicadas, capítulos	incompletos</li>
									</ol>

								</Box>

								<Box  
									sx={{ margin: "0 auto", width: "25rem", background:'#192A45', p:'1.5rem', borderRadius:'0.2rem'}}
									display='flex'
									flexDirection='column'
									justifyContent='space-around'

								>

									<Typography 
										variant="h5"
										margin='1rem'	
										color='#E2E9F3'
									>PAGOS</Typography>

									<ul
										style={{
											listStyleType: "upper-roman",
											textAlign: "left",
											alignItems: "left",
											color:'#E2E9F3'
										}}
									>
										<li>El sitio se maneja con una moneda propia</li>
										<li>Por cada manga que vendas el sitio se deja x%</li>
										<li>El intercambio de monedas a dinero real se realiza a través de un formulario</li>
										<li>Los días de cobro serán estipulados por el sitio</li>
										<li>El retiro se realiza mediante CBU</li>
										<li>El pago solo se efectuara por sus ventas</li>
										<li>no habra devolucion de su canje de monedas</li>
									</ul>

								</Box>

							</Box>

						<FormGroup sx={{ margin: "0 auto", alignSelf: "center" }}>
							<FormControlLabel
								control={
									<Checkbox
										sx={{color:'#1850AB'}}
										checked={checked}
										onChange={handleChange}
										inputProps={{ "aria-label": "controlled" }}
									/>
								}
								label="Acepto los términos y condiciones"
							/>
						</FormGroup>
						<Box 
							display='flex'				
							justifyContent='center'
						>
							<Button type="submit" variant="contained" sx={{width: "20rem", background:'#192A45'}} >
								Empieza a crear
							</Button>
						</Box>
						{snack.message && (
							<Snackbar type={snack.type} message={snack.message} />
						)}
					</Box>
				</Container>
			)}
		</Box>
		</Container>
	);
};

export default IndexProfile;