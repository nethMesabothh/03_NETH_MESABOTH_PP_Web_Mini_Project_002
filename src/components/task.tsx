"use client";
import React, { useState } from "react";
import CardComponent from "./card";
import { CreateTaskProps, STATUS, TasksType } from "@/types/tasks/TaskType";
import { updateTaskStatusByWorkspaceIdAction } from "@/actions/task/updateTaskStatusByWorkspaceIdAction";
import { toast } from "sonner";
import { Button } from "./ui/button";
import TaskForm from "./taskForm";
import { createTaskByWorkspaceIdAction } from "@/actions/task/createTaskByWorkspaceIdAction";

type props = {
	initialTasks: TasksType["payload"];
	workspaceId: string;
};

const TaskComponent = ({ initialTasks, workspaceId }: props) => {
	const [tasks, setTasks] = useState(initialTasks);
	const [editingTask, setEditingTask] = useState(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleSave = () => {
		try {
			if (editingTask) {
				// Update to the backend
			} else {
				// Create new Task
			}
		} catch (err) {
			console.log(err);
		} finally {
			setEditingTask(null), setIsFormOpen(false);
		}
	};

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

	const handleCreateTask = (tasks: CreateTaskProps) => {
		console.log(tasks);

		createTaskByWorkspaceIdAction({ workspaceId, body: tasks }).then((data) => {
			if (data) {
				toast.success("Create task successfully");
				setTasks((prev) => [...prev, data]);
			}
		});
	};

	const statusGroups = {
		NOT_STARTED: tasks.filter((t) => t.status === "NOT_STARTED"),
		IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
		FINISHED: tasks.filter((t) => t.status === "FINISHED"),
	};

	return (
		<div
			className="flex gap-10 items-start justify-evenly h-[47rem] overflow-auto overflow-y-auto px-2 [&::-webkit-scrollbar]:w-2
  					[&::-webkit-scrollbar-track]:rounded-full
  					[&::-webkit-scrollbar-track]:bg-gray-100
  					[&::-webkit-scrollbar-thumb]:rounded-full
  					[&::-webkit-scrollbar-thumb]:bg-gray-300
  					dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  					dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
		>
			{/* Not Started */}
			<div className="flex flex-col w-[25rem] ">
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
			<div className="flex flex-col w-[25rem] h-[45rem] ">
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
			{/* Create new Tasks */}
			<TaskForm
				handleCreateTask={handleCreateTask}
				open={isFormOpen}
				setOpen={setIsFormOpen}
				handleSave={handleSave}
				initialTasks={initialTasks}
			/>
		</div>
	);
};

export default TaskComponent;
