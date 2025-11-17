import React from "react";

const ProgressBar = ({ totalForms, registeredUsers }) => {
	const percentage = (registeredUsers / totalForms) * 100;

	return (
		<div
			style={{
				width: "100%",
				backgroundColor: "#e0e0e0",
				borderRadius: "20px",
				overflow: "hidden",
				height: "6px",
			}}
		>
			<div
				style={{
					height: "100%",
					width: `${percentage}%`,
					backgroundImage:
						"linear-gradient(to right, #5a87ef, #7346bc, #567ed9)",
					transition: "width 0.4s ease-in-out",
					borderRadius: "20px",
					textAlign: "center",
					color: "#fff",
					fontWeight: "bold",
					fontSize: "14px",
					lineHeight: "25px",
				}}
			/>
		</div>
	);
};

export default function ParticipentProgressBar({
	participants,
	maxParticipants,
}) {
	return (
		<div
			className="p-1 m-0"
			style={{ maxWidth: "400px", margin: "auto", width: "140px" }}
		>
			<ProgressBar
				totalForms={maxParticipants}
				registeredUsers={participants}
			/>
		</div>
	);
}
