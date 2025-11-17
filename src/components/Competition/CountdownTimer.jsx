import React, { useEffect, useState } from "react";

const CountdownTimer = ({ hours = 1, onComplete }) => {
	const [secondsLeft, setSecondsLeft] = useState(hours * 3600);

	useEffect(() => {
		if (secondsLeft <= 0) {
			if (onComplete) onComplete();
			return;
		}

		const interval = setInterval(() => {
			setSecondsLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [secondsLeft, onComplete]);

	const formatTime = (totalSeconds) => {
		const hrs = Math.floor(totalSeconds / 3600);
		const mins = Math.floor((totalSeconds % 3600) / 60);
		const secs = totalSeconds % 60;

		return [
			hrs.toString().padStart(2, "0"),
			mins.toString().padStart(2, "0"),
			secs.toString().padStart(2, "0"),
		].join(":");
	};

	return (
		<div className="countdown-timer pl-2">
			{secondsLeft > 0 ? (
				<span>{formatTime(secondsLeft)}</span>
			) : (
				<span>Time's up!</span>
			)}
		</div>
	);
};

export default CountdownTimer;
