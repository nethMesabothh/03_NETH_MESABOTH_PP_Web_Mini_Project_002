import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { DeleteTaskType, TaskType } from "@/types/tasks/TaskType";

type props = {
	taskId: string;
	workspaceId: string;
};

export const deleteTaskByIdService = async ({ taskId, workspaceId }: props) => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}`,
		{
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
		}
	);

	const data: DeleteTaskType = await response.json();

	return data;
};
