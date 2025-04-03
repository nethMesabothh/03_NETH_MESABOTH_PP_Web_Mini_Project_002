import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { TaskType } from "@/types/tasks/TaskType";

export const updateTaskStatusByWorkspaceIdService = async ({
	taskId,
	workspaceId,
	status,
}: {
	taskId: string;
	workspaceId: string;
	status: string;
}) => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/task/${taskId}/workspace/${workspaceId}/status?status=${status}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
		}
	);

	const data: TaskType = await response.json();

	return data.payload;
};
