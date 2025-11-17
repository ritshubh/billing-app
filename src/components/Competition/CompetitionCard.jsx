import React, { useEffect, useState } from "react";
import "../../css/CompetitionCard.css";
import ParticipentProgressBar from "./ParticipentProgressBar";
import { useNavigate } from "react-router-dom";
import { ref, push, getDatabase, onValue } from "firebase/database";
import fire from "../../config/fire";
import CountdownTimer from "./CountdownTimer";

const CompetitionCard = () => {
	const [competitionCardDetails, setCompetitionCardDetails] = useState([]);
	const navigate = useNavigate();
	useEffect(() => {
		const db = getDatabase();
		const compRef = ref(db, "competitionCardDetails");
		const unsubscribe = onValue(compRef, (snapshot) => {
			if (snapshot.exists()) {
				const data = snapshot.val();
				const formatted = Object.keys(data).map((key) => ({
					...data[key],
					firebaseId: key,
				}));
				setCompetitionCardDetails(formatted);
			} else {
				setCompetitionCardDetails([]);
			}
		});

		// Optional: cleanup function
		return () => unsubscribe();
	}, []);
	const getStatusColor = (status = "live") => {
		switch (status.toLowerCase()) {
			case "live":
				return "bg-live-status";
			case "upcoming":
				return "bg-upcoming-status";
			case "ended":
				return "bg-muted";
			default:
				return "bg-muted";
		}
	};
	const getStatusText = (status = "live") => {
		switch (status.toLowerCase()) {
			case "live":
				return "LIVE";
			case "upcoming":
				return "UPCOMING";
			case "ended":
				return "ENDED";
			default:
				return "UNKNOWN";
		}
	};

	const handleJoinClick = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
		navigate("/uploadReel");
	};

	return (
		<div className="compitite-card px-lg-5">
			{competitionCardDetails &&
				competitionCardDetails.map((item) => {
					const {
						id,
						title,
						description,
						prizePool,
						entryFee,
						participants,
						maxParticipants,
						timeLeft,
						status,
						featured,
					} = item;
					return (
						<div class="card-layout py-3">
							{/* Header */}
							<div className="d-flex justify-content-between px-4 py-2">
								<div className="pt-1">
									<div className="d-flex">
										<div
											className={`status-badge ${getStatusColor(
												status
											)}`}
										>
											{getStatusText(status)}
										</div>
										<div className="badge ml-1">
											<i
												class="fa fa-star-o"
												aria-hidden="true"
											></i>
											{featured && (
												<span className="px-1">
													FEATURED
												</span>
											)}
										</div>
									</div>
									<div className="text-left note pt-2">
										<h3 className="mb-1">{title}</h3>
										<p className="text-secondary mb-2">
											{description}
										</p>
									</div>
								</div>
								<div className="card-header-logo pt-1">
									<img src="https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=100&h=150&fit=crop" />
								</div>
							</div>

							{/* Prize Pool */}
							<div className="d-flex justify-content-between prize-pool mx-3 px-3 py-2">
								<div className="text-left">
									<p className="mb-1">Total Prize Pool</p>
									<p className="mb-1 winning-prize font-weight-bold">
										₹{prizePool}
									</p>
								</div>
								<div className="trophy-icon">
									<i
										class="fa fa-trophy px-3"
										aria-hidden="true"
									></i>
								</div>
							</div>

							{/* participants Stats */}
							<div className="d-flex justify-content-between p-3 text-left">
								<div className="col-6 p-0">
									<div className="card-participents">
										<i class="fa fa-users px-1"></i>
										<span className="text-secondary">
											Participants
										</span>
									</div>
									<div className="p-1 participent-count font-weight-bold">
										<span>
											{participants}/{maxParticipants}
										</span>
									</div>
									<div>
										<ParticipentProgressBar
											participants={participants}
											maxParticipants={maxParticipants}
										/>
									</div>
								</div>
								<div className="col-6 px-3">
									<div className="text-secondary time-left">
										<i class="fa fa-clock-o"></i>
										<span className="pl-1">Time Left</span>
									</div>
									<div>
										<span className="font-weight-bold">
											<CountdownTimer
												hours={timeLeft}
												onComplete={() =>
													console.log("Timer ended")
												}
											/>
										</span>
									</div>
								</div>
							</div>
							{/* Entry Fees */}
							<div className="d-flex justify-content-between px-3 py-1">
								<div className="text-left">
									<div className="text-secondary entry-fee">
										<span>Entry Fee</span>
									</div>
									<div className="entry-fee-amount font-weight-bold">
										<span>₹{entryFee}</span>
									</div>
								</div>
								<div className="join-btn-layout">
									<button
										className="card-join-now-btn"
										onClick={() => handleJoinClick(id)}
									>
										<div>
											<i class="fa fa-play px-1"></i>
											<span className="px-2">Join</span>
											<i class="fa fa-arrow-right px-1"></i>
										</div>
									</button>
								</div>
							</div>
						</div>
					);
				})}
		</div>
	);
};

export default CompetitionCard;
