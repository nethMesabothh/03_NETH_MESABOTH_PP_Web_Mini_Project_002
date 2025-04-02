import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { WorkspaceType } from "@/types/workspace/workspaceType";
import { revalidatePath } from "next/cache";

export const updateFavoriteStatusByIdService = async ({
	workspaceId,
	favorite,
}: {
	workspaceId: string;
	favorite: boolean;
}) => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}/favorite?favorite=${favorite}`,
		{
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
			next: { tags: ["workspace"] },
		}
	);

	revalidatePath("/");

	const data: WorkspaceType = await response.json();

	return data.payload;
};
