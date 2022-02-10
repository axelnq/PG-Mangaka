export default function Validation(values){
	 let errors = {}
	 if(!/\S+@\S+\.\S+/.test(values.email)){
	 	errors.email = "Email incorrecto"
	 }
	 if(!/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(values.password)){
	 	errors.password = "La contraseña debe tener  8 carácteres, al menos un número, una minúscula, una mayúscula, un símbolo"
	 }
	 if(values.password !== values.repeatedPassword){
	 	errors.repeatedPassword = "Las contraseñas no coinciden"
	 }
	 return errors;
}