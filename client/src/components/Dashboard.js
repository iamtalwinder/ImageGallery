import React, { useState } from "react";
import axios from "axios";
import FileUploader from "./FileUploader";
import ViewImages from "./ViewImages";
import "./Dashboard.css";

function Dashboard(props) {
	const [fileUploader, setFileUploader] = useState(false);

	const signout = async () => {
		try {
			await axios.delete("/api/user/sign-out");
			localStorage.setItem("signedIn", "no");
			props.history.push("/");
		} catch (err) {
			alert("Network error");
		}
	};

	const active = (event) => {
		document.getElementsByClassName("active-nav")[0].className = "";
		event.target.className = "active-nav";
	};

	return (
		<div className="dashboard-container">
			<ul className="nav-container">
				<li
					className="active-nav"
					onClick={(event) => {
						active(event);
						setFileUploader(false);
					}}
				>
					View Images
				</li>
				<li
					onClick={(event) => {
						active(event);
						setFileUploader(true);
					}}
				>
					Upload
				</li>
				<li onClick={signout}>SignOut</li>
			</ul>

			{fileUploader && <FileUploader />}
			{!fileUploader && <ViewImages />}
		</div>
	);
}

export default Dashboard;
