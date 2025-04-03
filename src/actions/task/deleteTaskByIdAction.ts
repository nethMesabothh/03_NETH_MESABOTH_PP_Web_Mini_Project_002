"use server";

import { deleteTaskByIdService } from "@/service/task/deleteTaskByIdService";
import { revalidateTag } from "next/cache";

type props = {
	taskId: string;
	workspaceId: string;
};

export const deleteTaskByIdAction = async ({ taskId, workspaceId }: props) => {
	const data = await deleteTaskByIdService({
		taskId,
		workspaceId,
	});
	revalidateTag("tasks");

	return data;
};
