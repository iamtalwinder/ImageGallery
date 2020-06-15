import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import ImageGrid from "./ImageGrid";

function ViewImages() {
	const PER_PAGE = 20;
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(false);
	const [page, setPage] = useState(1);
	const [images, setImages] = useState([]);
	const [hasMore, setHasMore] = useState(true);

	const fetchImages = async () => {
		try {
			const result = await axios.get(
				`api/user/get-images?start=${(page - 1) * PER_PAGE}&limit=${PER_PAGE}`
			);

			if (!result.data.length) return setHasMore(false);

			setImages([...images, ...result.data]);
			setPage(page + 1);
		} catch (err) {
			console.log(err);
			setError(true);
		}
	};

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const result = await axios.get(
					`api/user/get-images?start=${(page - 1) * PER_PAGE}&limit=${PER_PAGE}`
				);

				if (!result.data.length) return setHasMore(false);

				setImages(result.data);
				setPage(page + 1);
				setLoading(false);
			} catch (err) {
				console.log(err);
				setError(true);
			}
		};
		fetchImages();
	}, []);
	if (loading) return <h4>Loading...</h4>;
	if (error) return <h1>Error</h1>;
	return (
		<InfiniteScroll
			dataLength={images.length}
			next={fetchImages}
			hasMore={hasMore}
			loader={<h4>Loading...</h4>}
		>
			{<ImageGrid images={images} />}
		</InfiniteScroll>
	);
}

export default ViewImages;
