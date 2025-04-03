import CardComponent from "@/components/card";
import TaskComponent from "@/components/task";
import ToggleStarFavorite from "@/components/toggleStarFavorite";
import { getAllTaskService } from "@/service/task/getAllTaskService";
import { getWorkspaceByIdService } from "@/service/workspace/getWorkspaceByIdService";
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

	const tasks = await getAllTaskService({ workspaceId: todoId });

	return (
		<div className="mt-5 flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<h1 className="text-2xl">{q}</h1>
				<ToggleStarFavorite workspaceTasks={workspaceTasks} />
			</div>
			{/* Card */}
			<div>
				<TaskComponent initialTasks={tasks} workspaceId={todoId} />
			</div>
		</div>
	);
};

export default TodoPage;
