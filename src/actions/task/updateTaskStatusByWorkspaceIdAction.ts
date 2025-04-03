"use server";

import { updateTaskStatusByWorkspaceIdService } from "@/service/task/updateTaskStatusByWorkspaceIdService";
import { revalidateTag } from "next/cache";

export const updateTaskStatusByWorkspaceIdAction = async ({
	taskId,
	workspaceId,
	status,
}: {
	taskId: string;
	workspaceId: string;
	status: string;
}) => {
	const data = await updateTaskStatusByWorkspaceIdService({
		taskId,
		workspaceId,
		status,
	});
	revalidateTag("tasks");

	return data;
};
