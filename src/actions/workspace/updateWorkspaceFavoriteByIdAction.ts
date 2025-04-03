"use server";

import { updateFavoriteStatusByIdService } from "@/service/workspace/updateFavoriteStatusByIdService";
import { revalidateTag } from "next/cache";

export const updateWorkspaceFavoriteByIdAction = async ({
	workspaceId,
	favorite,
}: {
	workspaceId: string;
	favorite: boolean;
}) => {
	const data = await updateFavoriteStatusByIdService({ workspaceId, favorite });
	revalidateTag("workspace");

	return data;
};
