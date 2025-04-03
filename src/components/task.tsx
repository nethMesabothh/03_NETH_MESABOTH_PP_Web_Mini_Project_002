"use client";
import React, { useState } from "react";
import CardComponent from "./card";
import { STATUS, TasksType } from "@/types/tasks/TaskType";
import { updateTaskStatusByWorkspaceIdAction } from "@/actions/task/updateTaskStatusByWorkspaceIdAction";
import { toast } from "sonner";

type props = {
	initialTasks: TasksType["payload"];
	workspaceId: string;
};

const TaskComponent = ({ initialTasks, workspaceId }: props) => {
	const [tasks, setTasks] = useState(initialTasks);

	const handleStatusChange = (taskId: string, newStatus: string) => {
		setTasks((prev) =>
			prev.map((task) =>
				task.taskId === taskId ? { ...task, status: newStatus } : task
			)
		);
		updateTaskStatusByWorkspaceIdAction({
			taskId,
			workspaceId,
			status: newStatus,
		}).then((data) => {
			if (data) {
				toast.success("Update status successfully!");
			}
		});
	};

	const statusGroups = {
		NOT_STARTED: tasks.filter((t) => t.status === "NOT_STARTED"),
		IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
		FINISHED: tasks.filter((t) => t.status === "FINISHED"),
	};

	return (
		<div className="flex gap-10 items-start justify-evenly">
			{/* Not Started */}
			<div className="flex flex-col w-[25rem]">
				<h1 className="mt-5 pb-3 text-xl text-[#FF6B6B] border-b-2 border-[#FF6B6B]">
					Not Started
				</h1>
				{statusGroups.NOT_STARTED.map((task) => (
					<CardComponent
						key={task.taskId}
						task={task}
						onStatusChange={handleStatusChange}
					/>
				))}
			</div>
			{/* In Progress */}
			<div className="flex flex-col w-[25rem]">
				<h1 className="mt-5 pb-3 text-xl text-[#4ECDC4] border-b-2 border-[#4ECDC4]">
					In Progress
				</h1>
				{statusGroups.IN_PROGRESS.map((task) => (
					<CardComponent
						key={task.taskId}
						task={task}
						onStatusChange={handleStatusChange}
					/>
				))}
			</div>
			{/* Finished */}
			<div className="flex flex-col w-[25rem]">
				<h1 className="mt-5 pb-3 text-xl text-[#45B7F6] border-b-2 border-[#45B7F6]">
					Finished
				</h1>
				{statusGroups.FINISHED.map((task) => (
					<CardComponent
						key={task.taskId}
						task={task}
						onStatusChange={handleStatusChange}
					/>
				))}
			</div>
		</div>
	);
};

export default TaskComponent;
