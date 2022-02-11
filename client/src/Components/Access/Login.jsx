import * as React from "react";
import {Link} from 'react-router-dom';
import axios from 'axios';
//MUI
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import Stack from "@mui/material/Stack";


const AccessButton = styled(Button)({
  width: "47%",
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  color: "white",
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: 'lightblue'
  },
  '&:active': {
    boxShadow: 'none',
  },
});

export default function Login() {
	const [values, setValues] = React.useState({
		password: "",
		email: "",
		showPassword: false,
	});
	const [response, setResponse] = React.useState(null);
	const handleChange = (prop) => (e) => {
		setValues({ ...values, [prop]: e.target.value });
	};
	const handleClickShowPassword = (e) => {
		setValues({ ...values, showPassword: !values.showPassword });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		axios.post('http://localhost:3001/api/auth/local/login', {...values})
		.then(response => setResponse(response))
		.catch(error => setResponse(error));
		setValues("");
		alert(response)
	};

	return (
		<Box
			id="login"
			sx={{ width: "100%" }}
			component="form"
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			<Typography id="transition-modal-title" variant="h6">
				Inicia Sesión para empezar a leer!
			</Typography>
			<TextField
				fullWidth
				sx={{
					backgroundColor: "white",
					borderRadius: "5px 5px 0 0",
					my: 2,
				}}
				label="Email"
				variant="filled"
				onChange={handleChange('email')}
				required
			/>
			<FormControl required fullWidth sx={{ my: 2, backgroundColor: "white", borderRadius: "5px 5px 0 0" }} variant="filled">
				<InputLabel htmlFor="filled-adornment-password">
					Password
				</InputLabel>
				<FilledInput
					id="filled-adornment-password"
					type={values.showPassword ? "text" : "password"}
					value={values.password}
					onChange={handleChange("password")}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								edge="end"
							>
								{values.showPassword ? (
									<VisibilityOff />
								) : (
									<Visibility />
								)}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<Stack sx={{width: "100%"}} direction="column" spacing={1}>
			<AccessButton sx={{width: "100%"}} type="submit">Iniciar Sesión</AccessButton>
			<AccessButton sx={{width: "100%", backgroundColor:"white"}} ><Link style={{ textDecoration: "none", color:"#0063cc"}}  to="/register">Registrarse</Link></AccessButton>
			</Stack>
			<p style={{margin:"5px 0 2px 0", color:"#357ded", textAlign:"center"}}>O inicia sesión con:</p>
			<Divider sx={{mb: 2, backgroundColor: "#357ded"}}/>
			<AccessButton sx={{marginRight: "3%", borderRadius: 5}} startIcon={<FacebookIcon/>}>facebook</AccessButton>
			<a href="http://localhost:3001/api/auth/google" target="_blank" rel="noreferrer" style={{textDecoration: "none"}}>
			<AccessButton sx={{backgroundColor: "red", color: 'white', marginLeft: "3%", borderRadius: 5, '&:hover': {backgroundColor: "#ff726f"}}}  startIcon={<GoogleIcon />}>Google</AccessButton>
			</a>
		</Box>
	);
}
