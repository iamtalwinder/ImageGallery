import React, { useState } from "react";
import axios from "axios";
import ProgressBar from "./ProgressBar";
import "./FileUploader.css";

export default function FileUploader() {
	const [files, setFiles] = useState([]);
	const [fileNames, setFileNames] = useState("Choose file(s)");

	const [progress, setProgress] = useState(0);

	const handleFileChange = (event) => {
		let names = "";
		for (let file of event.target.files) names += file.name + ", ";
		setFileNames(names);
		setFiles(event.target.files);
		console.log(files);
	};

	const handleBrowse = () => {
		document.getElementById("inputFile").click();
	};

	const upload = async () => {
		const data = new FormData();
		for (let file of files) data.append("file", file);

		try {
			const response = await axios.post("/api/user/upload", data, {
				headers: { "Content-Type": "multipart/form-data" },
				onUploadProgress: (progressEvent) => {
					setProgress(
						Math.round((progressEvent.loaded * 100) / progressEvent.total)
					);
				},
			});
			const ID = setInterval(() => {
				alert(response.data);
				clearInterval(ID);
				setProgress(0);
			}, 1000);
		} catch (err) {
			setProgress(0);
			alert(err.response.data);
		}
	};
	return (
		<div className="container">
			<input
				id="inputFile"
				type="file"
				name="file"
				onChange={handleFileChange}
				multiple
			/>
			<div className="fileName">{fileNames}</div>
			<button className="browse" onClick={handleBrowse}>
				Browse
			</button>
			<button className="upload" onClick={upload}>
				Upload
			</button>
			<ProgressBar progress={progress} />
		</div>
	);
}
