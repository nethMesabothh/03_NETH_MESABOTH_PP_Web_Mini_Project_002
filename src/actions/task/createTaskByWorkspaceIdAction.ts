"use server";

import { createTaskByWorkspaceIdService } from "@/service/task/createTaskByWorkspaceIdService";
import { revalidateTag } from "next/cache";

type props = {
	workspaceId: string;
	body: {
		taskTitle: string;
		taskDetails: string;
		tag: string;
		endDate: string;
	};
};

export const createTaskByWorkspaceIdAction = async ({
	workspaceId,
	body,
}: props) => {
	const data = await createTaskByWorkspaceIdService({
		workspaceId,
		body,
	});
	revalidateTag("tasks");

	return data;
};
