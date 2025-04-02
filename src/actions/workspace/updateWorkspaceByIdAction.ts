"use server";

import { updateWorkspaceByIdService } from "@/service/workspace/updateWorkspaceByIdService";
import { revalidatePath, revalidateTag } from "next/cache";

export const updateWorkspaceByIdAction = async ({
	workspaceId,
	workspaceName,
}: {
	workspaceId: string;
	workspaceName: string;
}) => {
	const data = await updateWorkspaceByIdService({ workspaceId, workspaceName });
	revalidateTag("workspace");
	revalidatePath("/todo", "layout");

	return data;
};
