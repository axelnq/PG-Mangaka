import { useState } from "react";
import axios from 'axios';
export function useForm(initialForm, validation) {
	const [form, setForm] = useState(initialForm);
	const [errors, setErrors] = useState(initialForm);
	const [loading, setLoading] = useState(false);
	const [response, setResponse] = useState(null);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm({ ...form, [name]: value });
	};
	const handleBlur = (e) => {
		handleChange(e);
		setErrors(validation(form));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		const { username, name, email, password } = form;
		axios.post('http://localhost:3001/api/users/register', {username, name, email, password})
		.then(response =>{
			setLoading(false);
			setResponse(response);
		})
		.then(error => {
			setLoading(false);
			setResponse(response);
		})
		setForm(initialForm)
		setErrors(initialForm)
	};
	
	return {
		form,
		errors,
		loading,
		response,
		handleChange,
		handleBlur,
		handleSubmit,
	};
}
