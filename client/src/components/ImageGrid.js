import React from "react";
import "./ImageGrid.css";

function ImageGrid(props) {
	return (
		<div className="image-grid">
			{props.images.map((image) => (
				<img className="gallery-img" src={image.path} alt="image" />
			))}
		</div>
	);
}

export default ImageGrid;
