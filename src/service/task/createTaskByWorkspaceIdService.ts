import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { TaskType } from "@/types/tasks/TaskType";

type props = {
	workspaceId: string;
	body: {
		taskTitle: string;
		taskDetails: string;
		tag: string;
		endDate: string;
	};
};

export const createTaskByWorkspaceIdService = async ({
	workspaceId,
	body,
}: props) => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/workspace/${workspaceId}`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}
	);

	const data: TaskType = await response.json();

	return data.payload;
};
