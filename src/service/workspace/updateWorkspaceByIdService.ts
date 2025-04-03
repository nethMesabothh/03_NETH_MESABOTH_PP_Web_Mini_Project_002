import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import {
	WorkSpaceByIdType,
	WorkspaceType,
} from "@/types/workspace/workspaceType";

export const updateWorkspaceByIdService = async ({
	workspaceId,
	workspaceName,
}: {
	workspaceId: string;
	workspaceName: string;
}) => {
	try {
		const session: SessionType = (await auth()) as SessionType;

		const response = await fetch(
			`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace/${workspaceId}`,
			{
				method: "PUT",
				headers: {
					Authorization: `Bearer ${session.accessToken}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ workspaceName }),
			}
		);

		const data: WorkSpaceByIdType = await response.json();
		console.log(data);

		return data.payload;
	} catch (error) {
		console.log(error);
	}
};
