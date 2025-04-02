"use server";

import { getWorkspaceByIdService } from "@/service/workspace/getWorkspaceByIdService";
import { revalidatePath, revalidateTag } from "next/cache";

export const getWorkspaceByIdAction = async ({
	workspaceId,
}: {
	workspaceId: string;
}) => {
	console.log(workspaceId);
	const data = await getWorkspaceByIdService({ workspaceId });
	revalidateTag("workspace");
	revalidatePath("/todo", "layout");

	return data;
};
