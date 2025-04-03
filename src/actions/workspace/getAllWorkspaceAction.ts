"use server";

import { getAllWorkspaceService } from "@/service/workspace/getAllWorkspaceService";
import { revalidateTag } from "next/cache";

export const getAllWorkspaceAction = async () => {
	const data = await getAllWorkspaceService();
	revalidateTag("workspace");

	return data;
};
