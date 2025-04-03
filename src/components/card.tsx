import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { TaskType } from "@/types/tasks/TaskType";
import { Clock, Ellipsis } from "lucide-react";
import { Button } from "./ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatDate, getStatusColor } from "@/lib/helper";

type props = {
	task: TaskType["payload"];
	onStatusChange: (taskId: string, newStatus: string) => void;
	onEdit: (task: TaskType["payload"]) => void;
	onDelete: (taskId: string) => void;
};

export default function CardComponent({
	task,
	onStatusChange,
	onEdit,
	onDelete,
}: props) {
	return (
		<div className="border border-gray-300 rounded-xl mt-8">
			<div className="p-5">
				<div className="flex justify-between">
					<h2 className="text-xl font-bold capitalize">{task.taskTitle}</h2>
					<Button asChild>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Ellipsis />
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => onEdit(task)}>
									<h1 className="w-full text-center">Update</h1>
								</DropdownMenuItem>
								<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
									<AlertDialog>
										<AlertDialogTrigger className="w-full">
											Delete
										</AlertDialogTrigger>
										<AlertDialogContent>
											<AlertDialogHeader>
												<AlertDialogTitle>
													Are you absolutely sure?
												</AlertDialogTitle>
												<AlertDialogDescription>
													This action cannot be undone. This will permanently
													delete your task.
												</AlertDialogDescription>
											</AlertDialogHeader>
											<AlertDialogFooter>
												<AlertDialogCancel>Cancel</AlertDialogCancel>
												<AlertDialogAction
													onClick={() => onDelete(task.taskId)}
												>
													Continue
												</AlertDialogAction>
											</AlertDialogFooter>
										</AlertDialogContent>
									</AlertDialog>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</Button>
				</div>

				{/* task details */}
				<p className="line-clamp-2 text-light-steel-blue my-2 h-12">
					{task.taskDetails}
				</p>

				<div className="flex justify-between items-center mt-4">
					{/* tag */}
					<p className="bg-purple-100 text-purple-500 py-1.5 px-3 rounded-lg">
						{task.tag}
					</p>

					{/* status */}
					<div
						className={`rounded-full w-8 h-8 ${getStatusColor(task.status)}`}
					></div>
				</div>
			</div>

			{/* progress */}
			<div className="flex justify-between items-center border-t border-t-gray-300 p-5">
				<Select
					value={task.status}
					onValueChange={(value) => onStatusChange(task.taskId, value)}
				>
					<SelectTrigger
						className={`w-36 truncate border-watermelon-red text-watermelon-red`}
					>
						<SelectValue placeholder={"NOT_STARTED"} />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="NOT_STARTED">NOT_STARTED</SelectItem>
						<SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
						<SelectItem value="FINISHED">FINISHED</SelectItem>
					</SelectContent>
				</Select>

				{/* date */}
				<p className="flex gap-3 text-light-steel-blue">
					<Clock size={22} /> {formatDate(task.endDate)}
				</p>
			</div>
		</div>
	);
}
