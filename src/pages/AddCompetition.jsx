import React, { useState } from "react";
import { ref, push, getDatabase, set } from "firebase/database";
import fire from "../config/fire";
import "../css/AddCompetition.css"; // ⬅️ Import the CSS file
import { toast, ToastContainer } from "react-toastify";

const AddCompetition = () => {
	const db = getDatabase();
	const [formData, setFormData] = useState({
		title: "",
		description: "",
		prizePool: "",
		entryFee: "",
		participants: 0,
		maxParticipants: 0,
		timeLeft: "",
		status: "upcoming",
		featured: false,
	});

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		setFormData({
			...formData,
			[name]: type === "checkbox" ? checked : value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const competitionId = Date.now().toString();
		try {
			await set(ref(db, `competitionCardDetails/ ${competitionId}`), {
				...formData,
				id: competitionId,
			});

			toast.success("Competition added successfully...!");
			setFormData({
				title: "",
				description: "",
				prizePool: "",
				entryFee: "",
				participants: 0,
				maxParticipants: 0,
				timeLeft: "",
				status: "upcoming",
				featured: false,
			});
		} catch (error) {
			console.error("Error adding competition:", error);
			toast.warn("Something went wrong...!");
		}
	};

	return (
		<div className="form-container">
			<ToastContainer />
			<h2>Add New Competition</h2>
			<form className="competition-form" onSubmit={handleSubmit}>
				<label>Title</label>
				<input
					type="text"
					name="title"
					value={formData.title}
					onChange={handleChange}
					required
				/>

				<label>Description</label>
				<textarea
					name="description"
					value={formData.description}
					onChange={handleChange}
					required
				/>

				<label>Prize Pool</label>
				<input
					type="number"
					name="prizePool"
					value={formData.prizePool}
					onChange={handleChange}
					required
				/>

				<label>Entry Fee</label>
				<input
					type="number"
					name="entryFee"
					value={formData.entryFee}
					onChange={handleChange}
					required
				/>

				<label>Participants</label>
				<input
					type="number"
					name="participants"
					value={formData.participants}
					onChange={handleChange}
				/>

				<label>Max Participants</label>
				<input
					type="number"
					name="maxParticipants"
					value={formData.maxParticipants}
					onChange={handleChange}
					required
				/>

				<label>Time Left</label>
				<input
					type="text"
					name="timeLeft"
					value={formData.timeLeft}
					onChange={handleChange}
				/>

				<label>Status</label>
				<select
					name="status"
					value={formData.status}
					onChange={handleChange}
				>
					<option value="live">Live</option>
					<option value="upcoming">Upcoming</option>
					<option value="completed">Completed</option>
				</select>

				<label className="checkbox-label">
					<input
						type="checkbox"
						name="featured"
						checked={formData.featured}
						onChange={handleChange}
					/>{" "}
					Featured
				</label>

				<button type="submit" className="submit-button">
					Add Competition
				</button>
			</form>
		</div>
	);
};

export default AddCompetition;
