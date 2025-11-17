import React, { useState } from "react";
import CompetitionCard from "../components/Competition/CompetitionCard";
import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { competitionCardDetails } from "../constant/CompetitionCardDetalisConst";
import { stats } from "../constant/Stats";

const Home = () => {
	const [selectedFilter, setSelectedFilter] = useState("all");
	const navigate = useNavigate();
	const filters = [
		{ id: "all", label: "All Competitions" },
		{ id: "live", label: "Live Now" },
		{ id: "upcoming", label: "Upcoming" },
		{ id: "featured", label: "Featured" },
	];

	const liveCompetition = (navigateTo) => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		navigateTo === "liveCompetition"
			? navigate("/concertPage")
			: navigate("/uploadreel");
	};

	return (
		<div className="p-3">
			{/* Hero Section  */}
			<section className="relative overflow-hidden p-lg-4 hero-section">
				<h1 className="font-weight-bold hero-title-1">
					Create. Compete.
				</h1>
				<h1 className="hero-title-2 font-weight-bold">
					Win Real Money
				</h1>
				<div className="py-4 hero-note">
					Join thousands of creators competing for cash prizes. Upload
					your best reels, get likes and comments, and win big money
					every day.
				</div>
				<div className="d-flex justify-content-center hero-section-btn flex-wrap">
					<button
						className="btn-grad"
						onClick={() => liveCompetition("uploadReel")}
					>
						<i class="fa fa-upload pr-2" aria-hidden="true"></i>
						Upload Your Reel
					</button>
					<button
						className="watch-demo-btn blinking-bg"
						onClick={() => liveCompetition("liveCompetition")}
					>
						<span>Live Competition</span>
					</button>
				</div>
			</section>

			{/* Stats Section */}
			<section className="mx-auto p-lg-4 px-1">
				<div className="row card-component py-3">
					{stats.map((item) => {
						return (
							<div className="card-stats-box p-3 text-center mt-3">
								<span className={`card-box-icon ${item.color}`}>
									{item.icon}
								</span>
								<h2 className="card-box-price py-2">
									{item.value}
								</h2>
								<p className="card-box-label text-secondary">
									{item.label}
								</p>
							</div>
						);
					})}
				</div>
			</section>

			{/* Live Competitions Section */}
			<section className="mx-auto px-lg-4 py-3">
				<div className="d-flex justify-content-between align-items-center flex-wrap px-lg-5">
					<div className="live-competition-section text-left">
						<h2 className="font-weight-bold">Live Competitions</h2>
						<p className="text-secondary">
							Join now and start winning real money
						</p>
					</div>
					<div className="px-lg-2 text-left">
						{filters.map((item) => (
							<button
								key={item.id}
								onClick={() => setSelectedFilter(item.id)}
								className={`mx-1 my-2 live-section-btn  ${
									selectedFilter === item.id
										? "live-section-btn-bg"
										: null
								}`}
							>
								<span>{item.label}</span>
							</button>
						))}
					</div>
				</div>
			</section>

			{/* Competition card section */}
			<section>
				<CompetitionCard
					competitionCardDetails={competitionCardDetails}
				/>
			</section>

			{/* How It Works Section */}
			<section className="mx-auto p-lg-4 px-1 py-4">
				<div className="py-3">
					<h2 className="font-weight-bold pt-lg-4 pb-lg-2">
						How ReelWarz Works
					</h2>
					<span className="text-secondary">
						Simple steps to start earning money with your creative
						content
					</span>
				</div>
				<div className="process-details px-lg-5 py-4">
					<div className="p-2">
						<div className="process-details-icon pb-4">
							<span>
								<i class="fa fa-upload"></i>
							</span>
						</div>
						<div>
							<h3>1. Upload Your Reel</h3>
							<p className="text-secondary">
								Create amazing content and upload your reel to
								any live competition
							</p>
						</div>
					</div>
					<div className="p-2">
						<div className="process-details-icon pb-4">
							<span>
								<i class="fas fa-user-friends"></i>
							</span>
						</div>
						<h3>2. Get Engagement</h3>
						<p className="text-secondary">
							Promote your reel to get maximum likes, comments,
							and shares
						</p>
					</div>
					<div className="p-2">
						<div className="process-details-icon pb-4">
							<span>
								<i class="fas fa-crown"></i>
							</span>
						</div>
						<h3>3. Win & Get Paid</h3>
						<p className="text-secondary">
							Top performers win cash prizes distributed instantly
							to your wallet
						</p>
					</div>
				</div>
			</section>

			{/* Ready To Start Winning Section  */}
			<section className="mx-auto px-lg-4 py-lg-5 py-4 px-4 ready-to-start-section">
				<div className="text-center">
					<h2 className="font-weight-bold pt-2">
						Ready to Start Winning?
					</h2>
					<p className="text-secondary p-4">
						Join thousands of creators already earning money. Upload
						your first reel and participate in competitions starting
						as low as ₹10.
					</p>
				</div>
				<div className="py-3">
					<button
						className="px-5 py-2 get-ready-btn btn"
						onClick={() => liveCompetition("uploadReel")}
					>
						<span>Get Start Now</span>
						<i
							class="fa fa-arrow-right pl-3"
							aria-hidden="true"
						></i>
					</button>
				</div>
			</section>
		</div>
	);
};

export default Home;
