import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { WorkSpaceByIdType } from "@/types/workspace/workspaceType";

export const getWorkspaceByIdService = async ({
	workspaceId,
}: {
	workspaceId: string;
}) => {
	const session: SessionType = (await auth()) as SessionType;

	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}`,
		{
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
		}
	);

	const data: WorkSpaceByIdType = await response.json();

	return data.payload;
};
