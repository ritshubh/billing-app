import React from "react";
import StatsCard from "../component/StatsCard";

const HomeScreen = () => {
	return (
		<div className="">
			<div>
				<StatsCard
					title="Total Profit"
					value="Rs. 12,000"
					icon="💰"
					color="green"
				/>
			</div>
		</div>
	);
};

export default HomeScreen;
