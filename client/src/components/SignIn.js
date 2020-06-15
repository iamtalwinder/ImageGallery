import React, { useState } from "react";
import axios from "axios";
import "./Form.css";

function SignIn(props) {
	const [data, setData] = useState({
		email: "",
		password: "",
	});

	const handleChange = (event) => {
		setData({ ...data, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			await axios.post("/api/user/sign-in", data);
			localStorage.setItem("signedIn", "yes");

			window.addEventListener("storage", () => {
				if (localStorage.getItem("signedIn") === "no") {
					props.history.push("/");
				}
			});

			props.history.push("/dashboard");
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
