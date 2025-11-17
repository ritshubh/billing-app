import React from "react";
import { stats } from "../constant/Stats";
import "../css/StatsCard.css";

const StatsCard = () => {
	return (
		<section className="mx-auto p-lg-4 px-1">
			<div className="row card-component py-1">
				{stats.map((item) => {
					return (
						<div className="card-stats-box p-3 text-center mt-3">
							<span className={`card-box-icon ${item.color}`}>
								{item.icon}
							</span>
							<h2 className="card-box-price py-1">
								{item.value}
							</h2>
							<p className="card-box-label text-secondary mb-0">
								{item.label}
							</p>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default StatsCard;
