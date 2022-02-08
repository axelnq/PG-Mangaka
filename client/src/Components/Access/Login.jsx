import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button"
import { styled } from "@mui/material/styles";

const ColorButton = styled(Button)(({ theme }) => ({
  backgroundColor: "lightblue",
  '&:hover': {
    backgroundColor: "blue",
  },
}));
export default function Login() {
	const [values, setValues] = React.useState({
		password: "",
		email: "",
		showPassword: false,
	});
	const handleChange = (prop) => (e) => {
		setValues({ ...values, [prop]: e.target.value });
	};
	const handleClickShowPassword = (e) => {
		setValues({ ...values, showPassword: !values.showPassword });
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		alert(`tu email es: ${values.email}, password: ${values.password}`);
	};
	return (
		<Box
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
			/>
			<FormControl fullWidth sx={{ my: 2, backgroundColor: "white", borderRadius: "5px 5px 0 0" }} variant="filled">
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
			<ColorButton type="submit">Login</ColorButton>
		</Box>
	);
}
