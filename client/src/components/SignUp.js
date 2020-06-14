import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function SignUp(props) {
	const [data, setData] = useState({
		fname: "",
		lname: "",
		email: "",
		password: "",
		confirmPassword: "",
	});

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("/api/user/sign-up", data);
			alert(response.data);
		} catch (err) {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Network error");
			}
		}
	};
	return (
		<form className="form" onSubmit={handleSubmit}>
			<h3 className="form-header">SignUp</h3>
			<label htmlFor="fname">First Name:</label>
			<input type="text" name="fname" onChange={handleChange} />

			<label htmlFor="lname">Last Name:</label>
			<input type="text" name="lname" onChange={handleChange} />

			<label htmlFor="email">E-mail:</label>
			<input type="email" name="email" onChange={handleChange} />

			<label htmlFor="password">Password:</label>
			<input type="password" name="password" onChange={handleChange} />

			<label htmlFor="password">Confirm Password:</label>
			<input type="password" name="confirmPassword" onChange={handleChange} />

			<button type="submit">SignUp</button>
			<p
				className="form-link"
				onClick={() => {
					props.history.push("/");
				}}
			>
				Already have an account? SignIn
			</p>
		</form>
	);
}

export default SignUp;
