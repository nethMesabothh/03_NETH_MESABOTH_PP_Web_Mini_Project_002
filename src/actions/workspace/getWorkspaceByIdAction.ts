"use server";

import { getWorkspaceByIdService } from "@/service/workspace/getWorkspaceByIdService";
import { revalidateTag } from "next/cache";

export const getWorkspaceByIdAction = async ({
	workspaceId,
}: {
	workspaceId: string;
}) => {
	console.log(workspaceId);
	const data = await getWorkspaceByIdService({ workspaceId });
	revalidateTag("workspace");

	return data;
};
