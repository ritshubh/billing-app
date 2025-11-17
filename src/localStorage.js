export const setLiveCompetitionCard = (item) => {
	localStorage.setItem("liveCompetitionCard", JSON.stringify(item));
};

export const getLiveCompetitionCard = () => {
	const competitionCardDetails = localStorage.getItem("liveCompetitionCard")
		? JSON.parse(localStorage.getItem("liveCompetitionCard"))
		: {};
	return competitionCardDetails;
};
