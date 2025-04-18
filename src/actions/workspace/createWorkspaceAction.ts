"use server";

import { createWorkspaceService } from "@/service/workspace/createWorkspaceService";
import { revalidateTag } from "next/cache";

export const createWorkspaceAction = async ({
	workspaceName,
}: {
	workspaceName: string;
}) => {
	const data = await createWorkspaceService({ workspaceName });
	revalidateTag("workspace");

	return data;
};
