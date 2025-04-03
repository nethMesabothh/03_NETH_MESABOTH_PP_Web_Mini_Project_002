"use server";

import { updateWorkspaceByIdService } from "@/service/workspace/updateWorkspaceByIdService";
import { revalidateTag } from "next/cache";

export const updateWorkspaceByIdAction = async ({
	workspaceId,
	workspaceName,
}: {
	workspaceId: string;
	workspaceName: string;
}) => {
	const data = await updateWorkspaceByIdService({ workspaceId, workspaceName });
	revalidateTag("workspace");

	return data;
};
