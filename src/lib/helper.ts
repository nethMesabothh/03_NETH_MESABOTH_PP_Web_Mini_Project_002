export const getStatusColor = (status: string) => {
	switch (status) {
		case "NOT_STARTED":
			return "#FF6B6B"; // Red
		case "IN_PROGRESS":
			return "#4ECDC4"; // Teal
		case "FINISHED":
			return "#45B7F6"; // Blue
		default:
			return "#CCCCCC";
	}
};
