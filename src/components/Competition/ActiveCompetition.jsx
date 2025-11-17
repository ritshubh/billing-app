import React, { useEffect, useState } from "react";
import "../../css/ActiveCompetition.css";
import { ref, getDatabase, onValue } from "firebase/database";
import fire from "../../config/fire";
import CountdownTimer from "./CountdownTimer";

const ActiveCompetition = () => {
	const [competitionCardDetails, setCompetitionCardDetails] = useState([]);
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
		return () => unsubscribe();
	}, []);
	const liveCompetitions =
		competitionCardDetails &&
		competitionCardDetails?.filter(
			(item) => item.status?.trim().toLowerCase() === "live"
		);
	return (
		<div className="active-comp-section">
			{liveCompetitions &&
				liveCompetitions.map((item) => (
					<div className="active-comp-card p-4 my-2">
						<div className="card-details-title text-left pb-2">
							<h6 className="font-weight-bold mb-0">
								{item.title}
							</h6>
						</div>
						<div className="card-details text-left active-status">
							<div>{item.status.toUpperCase()}</div>
						</div>
						<div className="card-details text-left">
							<span>Entry Fee:</span>
							<text>₹{item.entryFee}</text>
						</div>
						<div className="card-details text-left">
							<span>Prize Pool:</span>
							<text>₹{item.prizePool}</text>
						</div>
						<div className="card-details text-left">
							<span>Participants:</span>
							<text>
								{item.participants}/{item.maxParticipants}
							</text>
						</div>
						<div className="card-details text-left">
							<span>Time Left:</span>
							<text>
								<CountdownTimer
									hours={item.timeLeft}
									onComplete={() =>
										console.log("Timer ended")
									}
								/>
							</text>
						</div>
						<div className="pt-3">
							<button className="pay-join-competition">
								Pay Now
							</button>
						</div>
						<div className="join-note pt-3">
							<p>
								<b>Note: </b>
								Please pay first then you can join the
								competition
							</p>
						</div>
					</div>
				))}
		</div>
	);
};

export default ActiveCompetition;
