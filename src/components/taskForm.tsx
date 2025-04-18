"use client";
import { z } from "zod";
import {
	AlertDialog,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "./ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { DatePicker } from "./datePicker";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { CreateTaskProps, TasksType, TaskType } from "@/types/tasks/TaskType";
import { TYPE_TASK_LISTS } from "@/lib/constant";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

type props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	handleSave: (updateTask: CreateTaskProps) => void;
	initialTask: TaskType["payload"] | null;
	handleOnReset: () => void;
	startDateEdit: string | undefined;
};

const formSchema = (startDate?: string) =>
	z.object({
		title: z.string().min(2).max(50),
		tag: z
			.string({ required_error: "Tag is required" })
			.min(1, "Tag cannot be empty"),
		endDate: z
			.date({
				required_error: "End date is required",
				invalid_type_error: "Invalid date format",
			})
			.refine(
				(date) => {
					if (!startDate) return true;

					const start = new Date(startDate);

					return start <= date;
				},
				{
					message: "End date cannot be earlier than the start date",
				}
			),
		Details: z.string().optional(),
	});

const TaskForm = ({
	handleSave,
	open,
	setOpen,
	initialTask,
	handleOnReset,
	startDateEdit,
}: props) => {
	const form = useForm<z.infer<ReturnType<typeof formSchema>>>({
		resolver: zodResolver(formSchema(startDateEdit)),
		defaultValues: initialTask
			? {
					title: initialTask.taskTitle,
					tag: initialTask.tag,
					endDate: initialTask.endDate
						? new Date(initialTask.endDate)
						: new Date(),
					Details: initialTask.taskDetails,
			  }
			: {
					title: "",
					tag: "",
					endDate: new Date(),
					Details: "",
			  },
	});
	function onSubmit(values: z.infer<ReturnType<typeof formSchema>>) {
		const formattedValues = {
			...values,
			endDate: new Date(values.endDate).toISOString(),
		};
		handleSave({
			taskTitle: formattedValues.title,
			taskDetails: formattedValues?.Details ?? "",
			tag: formattedValues.tag,
			endDate: formattedValues.endDate,
		});
		setOpen(false);
	}

	useEffect(() => {
		if (initialTask) {
			form.reset({
				title: initialTask.taskTitle,
				tag: initialTask.tag,
				endDate: initialTask.endDate
					? new Date(initialTask.endDate)
					: new Date(),
				Details: initialTask.taskDetails,
			});
		} else {
			form.reset({
				title: "",
				tag: "",
				endDate: new Date(),
				Details: "",
			});
		}
	}, [initialTask, form]);

	const onReset = () => {
		handleOnReset();
	};

	return (
		<div className="fixed top-28 right-30">
			<AlertDialog open={open} onOpenChange={setOpen}>
				<AlertDialogTrigger
					className="bg-[#4379F2] text-white py-2 px-4 rounded-2xl cursor-pointer"
					onClick={onReset}
				>
					New Task
				</AlertDialogTrigger>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							{initialTask ? "Editing Task" : "Create New Task"}{" "}
						</AlertDialogTitle>
						<Form {...form}>
							<form
								onSubmit={form.handleSubmit(onSubmit)}
								className="space-y-4 flex flex-col"
							>
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<FormControl>
												<Input
													placeholder="Please type your task title"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="tag"
									render={({ field, fieldState }) => (
										<FormItem>
											<FormLabel>Tag</FormLabel>
											<FormControl>
												<Select {...field} onValueChange={field.onChange}>
													<SelectTrigger
														className="w-full"
														aria-invalid={!!fieldState.error}
													>
														<SelectValue placeholder="Please select a tag" />
													</SelectTrigger>
													<SelectContent>
														{TYPE_TASK_LISTS.map((taskType) => (
															<SelectItem value={taskType} key={taskType}>
																{taskType}
															</SelectItem>
														))}
													</SelectContent>
												</Select>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="endDate"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Title</FormLabel>
											<DatePicker {...field} initialTask={initialTask} />
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={form.control}
									name="Details"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Detail</FormLabel>
											<FormControl>
												<Input
													placeholder="Provide some details about your task (optional)"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<div className="flex mt-5 gap-3 justify-end">
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<Button type="submit" disabled={form.formState.isSubmitting}>
										{form.formState.isSubmitting ? "Saving..." : "Submit"}
									</Button>
								</div>
							</form>
						</Form>
					</AlertDialogHeader>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
};

export default TaskForm;
