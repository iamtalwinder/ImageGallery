import React from "react";
import ImageGrid from "./ImageGrid";

function ViewImages() {
	return (
		<ImageGrid
			images={[
				{ path: "uploads\\d8cd3db8-d09c-4829-ab1d-e9a928e51c9b-logo.png" },
				{ path: "uploads\\4ab53d0c-9a91-4c8f-9b42-6c654f6e6d40-poster.jpg" },
			]}
		/>
	);
}

export default ViewImages;
