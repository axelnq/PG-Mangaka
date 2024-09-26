const regPass = new RegExp(
	/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-._]).{8,15}$/
);
const regEmail = new RegExp(
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
);
export default function Validation(values) {
	let errors = {};
	if (!regEmail.test(values.email)) {
		errors.email = "Email incorrecto";
	}
	if (!regPass.test(values.password)) {
		errors.password =
			"La contraseña debe tener  8 carácteres, al menos un número, una minúscula, una mayúscula, un símbolo";
	}
	if (values.password !== values.repeatedPassword) {
		errors.repeatedPassword = "Las contraseñas no coinciden";
	}
	return errors;
}
