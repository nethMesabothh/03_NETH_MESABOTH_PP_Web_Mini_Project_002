import { auth } from "@/auth";
import { SessionType } from "@/types/sessionType";
import { WorkspaceCreateType } from "@/types/workspace/workspaceType";
import { revalidateTag } from "next/cache";

export const createWorkspaceService = async ({
	workspaceName,
}: {
	workspaceName: string;
}) => {
	console.log(workspaceName);
	const session: SessionType = (await auth()) as SessionType;
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_AUTH_BASE_URL}/workspace`,
		{
			method: "POST",
			headers: {
				Authorization: `Bearer ${session.accessToken}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ workspaceName }),
		}
	);

	const data: WorkspaceCreateType = await response.json();
	console.log(data);
	return data.payload;
};
