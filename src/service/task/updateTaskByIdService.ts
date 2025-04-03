import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { UpdateTaskType } from "@/types/tasks/TaskType";

type props = {
	taskId: string;
	workspaceId: string;
	body: {
		taskTitle: string;
		taskDetails: string;
		tag: string;
		endDate: string;
	};
};

export const updateTaskByIdService = async ({
	taskId,
	workspaceId,
	body,
}: props) => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
		{
			method: "PUT",
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		}
	);

	const data: UpdateTaskType = await response.json();

	return data;
};
