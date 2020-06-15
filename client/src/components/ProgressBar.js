import React from "react";
import "./ProgressBar.css";

export default function ProgressBar(props) {
	return (
		<div className="progressContainer">
			<div className="progress" style={{ width: `${props.progress}%` }}></div>
		</div>
	);
}
