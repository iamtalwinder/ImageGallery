import React from "react";
import "./ImageGrid.css";

function ImageGrid(props) {
	if (!props.images.length) return <h3>Upload some images first!</h3>;
	return (
		<div className="image-grid">
			{props.images.map((image, index) => (
				<img key={index} className="gallery-img" src={image.path} alt="pic" />
			))}
		</div>
	);
}

export default ImageGrid;
