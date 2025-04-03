export const getStatusColor = (status: string) => {
	switch (status) {
		case "NOT_STARTED":
			return "bg-[#FF6B6B]"; // Red
		case "IN_PROGRESS":
			return "bg-[#4ECDC4]"; // Teal
		case "FINISHED":
			return "bg-[#45B7F6]"; // Blue
		default:
			return "bg-[#EEEFFF]";
	}
};

export const getStatusColorNumber = (number: number): string => {
	// Ensure number is at least 1 and cycle every 4
	const cycle = Math.max(1, number % 4 || 4);

	switch (cycle) {
		case 1:
			return "bg-[#FF6B6B]"; // Red
		case 2:
			return "bg-[#4ECDC4]"; // Teal
		case 3:
			return "bg-[#45B7F6]"; // Blue
		case 4:
			return "bg-[#777EEF]"; // Gray
		default:
			return "bg-[#777EEF]"; // Fallback
	}
};
/**
 * Formats a date string to a readable format
 * Shows "Today" or "Tomorrow" for respective dates
 * Otherwise formats as "Mar 24, 2025"
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const tomorrow = new Date(today);
	tomorrow.setDate(tomorrow.getDate() + 1);

	const inputDate = new Date(date);
	inputDate.setHours(0, 0, 0, 0);

	if (inputDate.getTime() === today.getTime()) {
		return "Today";
	} else if (inputDate.getTime() === tomorrow.getTime()) {
		return "Tomorrow";
	}

	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const month = months[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();

	return `${month} ${day}, ${year}`;
}
