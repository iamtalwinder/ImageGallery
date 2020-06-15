import React, { useState, useEffect } from "react";
import axios from "axios";
import FileUploader from "./FileUploader";
import "./Dashboard.css";

const refreshToken = async () => {
	try {
		await axios.get("/api/user/refresh-auth-token");
	} catch (err) {
		alert("Network error");
	}
};

function Dashboard(props) {
	const [fileUploader, setFileUploader] = useState(false);

	useEffect(() => {
		refreshToken();
		const ID = setInterval(refreshToken, 840000);
		return () => {
			clearInterval(ID);
			localStorage.clear("expiresIn");
		};
	}, []);

	const signout = async () => {
		try {
			await axios.delete("/api/user/sign-out");
			localStorage.clear("expiresIn");
			props.history.push("/");
		} catch (err) {
			alert("Network error");
		}
	};

	const active = (event) => {
		document.getElementsByClassName("active")[0].className = "";
		event.target.className = "active";
	};

	return (
		<div className="dashboard-container">
			<ul className="nav-container">
				<li className="active" onClick={active}>
					View Images
				</li>
				<li
					onClick={(event) => {
						active(event);
						setFileUploader(true);
					}}
				>
					Upload Images
				</li>
				<li onClick={signout}>SignOut</li>
			</ul>

			{fileUploader && <FileUploader />}
		</div>
	);
}

export default Dashboard;
