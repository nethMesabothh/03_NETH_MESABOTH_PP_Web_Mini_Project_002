import ToggleStarFavorite from "@/components/toggleStarFavorite";
import { getWorkspaceByIdService } from "@/service/workspace/getWorkspaceByIdService";
import Image from "next/image";
import React from "react";

const TodoPage = async ({
	params,
	searchParams,
}: {
	params: Promise<{ todoId: string }>;
	searchParams: Promise<{ q: string }>;
}) => {
	const { todoId } = await params;
	const { q } = await searchParams;

	const workspaceTasks = await getWorkspaceByIdService({ workspaceId: todoId });

	return (
		<div className="mt-5">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl">{q}</h1>
				<ToggleStarFavorite workspaceTasks={workspaceTasks} />
			</div>
		</div>
	);
};

export default TodoPage;
