"use client";

import React, { useEffect, useState } from "react";
import Logo from "./logo";
import { Button } from "./ui/button";
import { getAllWorkspaceAction } from "@/actions/workspace/getAllWorkspaceAction";
import { createWorkspaceAction } from "@/actions/workspace/createWorkspaceAction";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import LogoutButtonComponent from "./LogoutButtonComponent";
import UpdateWorkspaceComponent from "./update-workspace";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { WorkspacePayloadType } from "@/types/workspace/workspaceType";
import { useRouter } from "next/navigation";
import Favorite from "./favorite";

const Sidebar = () => {
	const [workspaces, setWorkspaces] =
		useState<WorkspacePayloadType["payload"]>();
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const router = useRouter();

	const handleOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const workspaceName =
			new FormData(e.currentTarget).get("workspaceName")?.toString() ?? "";

		if (workspaceName === "") {
			toast.error("Workspace cannot be empty!");
			return;
		}

		try {
			await createWorkspaceAction({ workspaceName });
			const updatedWorkspaces = await getAllWorkspaceAction();
			setWorkspaces(updatedWorkspaces);
			toast.success("Workspace created successfully!");
		} catch (error) {
			toast.error("Failed to create workspace");
		} finally {
			setIsOpen(false);
			router.refresh();
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllWorkspaceAction();
			setWorkspaces(data);
		};
		fetchData();
	}, []);

	return (
		<div className="px-20 py-10 min-h-screen flex flex-col justify-start items-center gap-10">
			<Logo />
			<div className="flex flex-col mx-10 w-[130%] justify-center items-center mt-10">
				<div className="flex flex-col w-[100%]">
					<div className="flex justify-between items-center w-full">
						<h1>Workspace</h1>
						<Dialog open={isOpen} onOpenChange={setIsOpen}>
							<DialogTrigger asChild className="cursor-pointer">
								<Image src="/add-square.png" alt="add" width={20} height={20} />
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<form onSubmit={handleOnSubmit}>
									<DialogHeader>
										<DialogTitle>Create New Workspace</DialogTitle>
									</DialogHeader>
									<div className="grid gap-4">
										<div className="grid grid-cols-1 items-center gap-2">
											<Label htmlFor="workspaceName" className="text-right">
												Workspace Name
											</Label>
											<Input
												name="workspaceName"
												id="workspaceName"
												className="col-span-3"
											/>
										</div>
									</div>
									<DialogFooter>
										<Button type="submit">Create</Button>
									</DialogFooter>
								</form>
							</DialogContent>
						</Dialog>
					</div>
					<div
						className="flex flex-col gap-2 mt-4 h-[10rem] overflow-auto [&::-webkit-scrollbar]:w-2
  					[&::-webkit-scrollbar-track]:rounded-full
  					[&::-webkit-scrollbar-track]:bg-gray-100
  					[&::-webkit-scrollbar-thumb]:rounded-full
  					[&::-webkit-scrollbar-thumb]:bg-gray-300
  					dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  					dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
					>
						{workspaces?.map((workspace) => (
							<div
								key={workspace.workspaceId}
								className="flex items-center justify-between px-2"
							>
								<Link
									href={`/todo/${workspace.workspaceId}/?q=${workspace.workspaceName}`}
									className="flex justify-between"
								>
									<h1>{workspace.workspaceName}</h1>
								</Link>
								<UpdateWorkspaceComponent
									workspaceId={workspace.workspaceId}
									workspaceName={workspace.workspaceName}
								/>
							</div>
						))}
					</div>
				</div>
			</div>
			<Favorite />
			<LogoutButtonComponent />
		</div>
	);
};

export default Sidebar;
