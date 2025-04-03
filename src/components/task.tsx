"use client";
import React, { useState } from "react";
import CardComponent from "./card";
import {
	CreateTaskProps,
	STATUS,
	TasksType,
	TaskType,
	UpdateTaskType,
} from "@/types/tasks/TaskType";
import { updateTaskStatusByWorkspaceIdAction } from "@/actions/task/updateTaskStatusByWorkspaceIdAction";
import { toast } from "sonner";
import { Button } from "./ui/button";
import TaskForm from "./taskForm";
import { createTaskByWorkspaceIdAction } from "@/actions/task/createTaskByWorkspaceIdAction";
import { useRouter } from "next/navigation";
import { deleteTaskByIdAction } from "@/actions/task/deleteTaskByIdAction";
import { updateTaskByIdAction } from "@/actions/task/updateTaskByIdAction";

type props = {
	initialTasks: TasksType["payload"];
	workspaceId: string;
};

const TaskComponent = ({ initialTasks, workspaceId }: props) => {
	const [tasks, setTasks] = useState(initialTasks);
	const [editingTask, setEditingTask] = useState<TaskType["payload"] | null>(
		null
	);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const router = useRouter();

	const handleSave = async (updateTask: CreateTaskProps) => {
		try {
			if (editingTask) {
				// Update
				console.log("Update", updateTask);
				setTasks((prev) =>
					prev.map((task) =>
						task.taskId === editingTask.taskId
							? {
									...task,
									taskTitle: updateTask.taskTitle,
									taskDetails: updateTask.taskDetails,
									tag: updateTask.tag,
									endDate: updateTask.endDate,
							  }
							: task
					)
				);

				const data: UpdateTaskType = await updateTaskByIdAction({
					taskId: editingTask.taskId,
					workspaceId,
					body: updateTask,
				});

				if (data.status === "OK") {
					toast.success(data.message);
					router.refresh();
				} else {
					toast.error(data.message);
				}
			} else {
				// Create
				console.log("Create", updateTask);
				createTaskByWorkspaceIdAction({ workspaceId, body: updateTask }).then(
					(data) => {
						if (data) {
							toast.success("Create task successfully");
							setTasks((prev) => [...prev, data]);
						}
					}
				);
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

	const handleOnReset = () => {
		setEditingTask(null);
	};

	const statusGroups = {
		NOT_STARTED: tasks.filter((t) => t.status === "NOT_STARTED"),
		IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
		FINISHED: tasks.filter((t) => t.status === "FINISHED"),
	};

	const handleOnDelete = async (taskId: string) => {
		setTasks((prev) => prev.filter((task) => task.taskId !== taskId));

		const data = await deleteTaskByIdAction({ taskId, workspaceId });

		if (data) {
			toast.success("Delete task successfully");
			router.refresh();
		}
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
						onEdit={(task) => {
							setEditingTask(task);
							setIsFormOpen(true);
						}}
						onDelete={(taskId) => handleOnDelete(taskId)}
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
						onEdit={(task) => {
							setEditingTask(task);
							setIsFormOpen(true);
						}}
						onDelete={(taskId) => handleOnDelete(taskId)}
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
						onEdit={(task) => {
							setEditingTask(task);
							setIsFormOpen(true);
						}}
						onDelete={(taskId) => handleOnDelete(taskId)}
					/>
				))}
			</div>
			{/* Create new Tasks */}
			<TaskForm
				key={editingTask?.taskId}
				open={isFormOpen}
				setOpen={setIsFormOpen}
				handleSave={handleSave}
				initialTask={editingTask}
				handleOnReset={handleOnReset}
				startDateEdit={editingTask?.startDate}
			/>
		</div>
	);
};

export default TaskComponent;
