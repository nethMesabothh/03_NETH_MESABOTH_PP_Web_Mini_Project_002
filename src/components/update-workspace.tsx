"use client";
import { updateWorkspaceByIdAction } from "@/actions/workspace/updateWorkspaceByIdAction";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import { Workspace } from "@/types/workspace/workspaceType";

type props = {
	workspaceId: string;
	workspaceName: string;
	setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[] | undefined>>;
};

const UpdateWorkspaceComponent = ({
	workspaceId,
	workspaceName,
	setWorkspaces,
}: props) => {
	const [updateName, setUpdateName] = useState<string | undefined>();
	const [isOpen, setIsOpen] = useState(false);

	const handleOnSave = () => {
		if (!updateName?.trim()) {
			toast.error("Workspace name cannot be empty");
			return;
		}

		updateWorkspaceByIdAction({
			workspaceId,
			workspaceName: updateName ?? "",
		}).then((data) => {
			if (data) {
				toast("Update successfully!");
				setIsOpen(false);
				setWorkspaces((prev) =>
					prev?.map((workspace) =>
						workspace.workspaceId === data.workspaceId
							? { ...workspace, workspaceName: updateName }
							: workspace
					)
				);
			}
		});
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<Image
					src="/more.png"
					alt="more"
					width={20}
					height={20}
					className="cursor-pointer"
				/>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuItem onSelect={(e) => e.preventDefault()}>
					<Dialog open={isOpen} onOpenChange={setIsOpen}>
						<DialogTrigger asChild>
							<Button variant="ghost">Update workspace</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Update workspace name</DialogTitle>
							</DialogHeader>
							<div className="grid gap-4 py-4">
								<div className="grid grid-cols-1 items-center gap-4">
									<Label htmlFor="workspaceName" className="text-right">
										Workspace Name
									</Label>
									<Input
										name="workspaceName"
										id="workspaceName"
										defaultValue={workspaceName}
										className="col-span-3"
										onChange={(e) => setUpdateName(e.target.value)}
										onFocus={(e) => {
											const value = e.target.value;
											e.target.setSelectionRange(value.length, value.length);
										}}
									/>
								</div>
							</div>
							<DialogFooter>
								<Button onClick={handleOnSave}>Save changes</Button>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UpdateWorkspaceComponent;
