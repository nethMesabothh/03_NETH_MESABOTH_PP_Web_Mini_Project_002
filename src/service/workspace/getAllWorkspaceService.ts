import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { WorkspaceType } from "@/types/workspace/workspaceType";

export const getAllWorkspaceService = async () => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspaces`,
		{
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
			next: { tags: ["workspace"] },
		}
	);

	const data: WorkspaceType = await response.json();

	return data.payload;
};
