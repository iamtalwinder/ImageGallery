import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import Dashboard from "./Dashboard";

function SignIn(props) {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const [dashboard, setDashboard] = useState(false);
	let expiresIn;

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post("/api/user/sign-in", data);
			expiresIn = response.data.expiresIn;
			setDashboard(true);
		} catch (err) {
			if (err.response) {
				alert(err.response.data);
			} else {
				alert("Network error");
			}
		}
	};

	if (dashboard)
		return <Dashboard expiresIn={expiresIn} setDashboard={setDashboard} />;
	return (
		<form className="form" onSubmit={handleSubmit}>
			<h3 className="form-header">SignIn</h3>

			<label htmlFor="email">E-mail:</label>
			<input type="email" name="email" onChange={handleChange} />

			<label htmlFor="password">Password:</label>
			<input type="password" name="password" onChange={handleChange} />

			<button type="submit">SignIn</button>
			<p
				className="form-link"
				onClick={() => {
					props.history.push("/sign-up");
				}}
			>
				Don't have an account? SignUp
			</p>
		</form>
	);
}

export default SignIn;
