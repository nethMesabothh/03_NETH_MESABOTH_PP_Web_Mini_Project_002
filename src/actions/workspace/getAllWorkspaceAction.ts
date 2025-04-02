"use server";

import { getAllWorkspaceService } from "@/service/workspace/getAllWorkspaceService";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllWorkspaceAction = async () => {
	const data = await getAllWorkspaceService();
	revalidateTag("workspace");
	revalidatePath("/todo", "layout");

	return data;
};
