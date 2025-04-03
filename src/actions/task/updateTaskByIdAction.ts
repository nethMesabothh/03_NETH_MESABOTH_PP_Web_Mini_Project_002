"use server";

import { updateTaskByIdService } from "@/service/task/updateTaskByIdService";
import { revalidateTag } from "next/cache";

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

export const updateTaskByIdAction = async ({
	taskId,
	workspaceId,
	body,
}: props) => {
	const data = await updateTaskByIdService({
		taskId,
		workspaceId,
		body,
	});
	revalidateTag("tasks");

	return data;
};
