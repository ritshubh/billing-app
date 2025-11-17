import React, { useState } from "react";
import ReelPostCard from "../components/ReelPostCard";
import "../css/ConcertPage.css";
import { concertReelData } from "../constant/Constant";

const ConcertPage = () => {
	const [searchTerm, setSearchTerm] = useState("");
	const [showSearch, setShowSearch] = useState(false);

	const handleCloseSearch = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		setSearchTerm("");
		setShowSearch(!showSearch);
	};

	const handleInputChange = (event) => {
		setSearchTerm(event.target.value);
	};
	const filteredItems = concertReelData.filter((item) =>
		item.userName.toLowerCase().includes(searchTerm.toLowerCase())
	);
	return (
		<div>
			{!showSearch && (
				<i
					className="fa fa-search search-icon pt-2"
					onClick={handleCloseSearch}
				></i>
			)}

			<div>
				{showSearch && (
					<div className="search-box pt-2">
						<input
							className="search-post"
							type="text"
							placeholder="Search..."
							value={searchTerm}
							onChange={handleInputChange}
						/>
						<i
							className="fa fa-close close-search-icon pt-1"
							onClick={handleCloseSearch}
						></i>
					</div>
				)}
				<div className="pt-3">
					<button className="category-btn mr-2">
						Garba Dressing Concert
					</button>
					<button className="category-btn">
						Garba Dressing Concert
					</button>
				</div>
				{filteredItems &&
					filteredItems.map((item) => (
						<div className="concert-page py-2">
							<ReelPostCard item={item} />
						</div>
					))}
			</div>
		</div>
	);
};

export default ConcertPage;
