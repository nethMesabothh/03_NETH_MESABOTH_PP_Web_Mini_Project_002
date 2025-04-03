import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { TasksType } from "@/types/tasks/TaskType";

export const getAllTaskService = async ({
	workspaceId,
}: {
	workspaceId: string;
}) => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/tasks/workspace/${workspaceId}`,
		{
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
			next: { tags: ["tasks"] },
		}
	);

	const data: TasksType = await response.json();

	return data.payload;
};
