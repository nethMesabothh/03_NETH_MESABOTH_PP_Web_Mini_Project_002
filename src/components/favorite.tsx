"use client";

import { getAllWorkspaceAction } from "@/actions/workspace/getAllWorkspaceAction";
import {
	Workspace,
	WorkspacePayloadType,
} from "@/types/workspace/workspaceType";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UpdateWorkspaceComponent from "./update-workspace";
import { getStatusColorNumber } from "@/lib/helper";

type props = {
	setWorkspaces: React.Dispatch<React.SetStateAction<Workspace[] | undefined>>;
};

const Favorite = ({ setWorkspaces: setWorkspaceParent }: props) => {
	const [workspaces, setWorkspaces] = useState<
		WorkspacePayloadType["payload"] | undefined
	>();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllWorkspaceAction();
			if (data) {
				setWorkspaces(data);
			}
		};
		fetchData();
	}, []);

	return (
		<div className="flex flex-col justify-start items-center w-[130%]">
			<div className="flex justify-between items-center w-full">
				<h1 className="text-xl text-muted-foreground my-2">Favorite</h1>
				<Image src="/star.png" alt="start" width={22} height={20} />
			</div>
			<div
				className="flex flex-col space-y-3 gap-2 mt-4 h-[10rem] overflow-auto w-full [&::-webkit-scrollbar]:w-2
  					[&::-webkit-scrollbar-track]:rounded-full
  					[&::-webkit-scrollbar-track]:bg-gray-100
  					[&::-webkit-scrollbar-thumb]:rounded-full
  					[&::-webkit-scrollbar-thumb]:bg-gray-300
  					dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  					dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
			>
				{workspaces
					?.filter((workspace) => workspace.isFavorite == true)
					.map((workspace, index) => {
						return (
							<div
								key={workspace.workspaceId}
								className="flex items-center justify-between px-2"
							>
								<div className="flex items-center gap-3">
									<div
										className={`rounded-full w-2 h-2 ${getStatusColorNumber(
											index
										)}`}
									></div>
									<Link
										href={`/todo/${workspace.workspaceId}/?q=${workspace.workspaceName}`}
										className="flex justify-between"
									>
										<h1>{workspace.workspaceName}</h1>
									</Link>
								</div>
								<UpdateWorkspaceComponent
									workspaceId={workspace.workspaceId}
									workspaceName={workspace.workspaceName}
									setWorkspaces={setWorkspaceParent}
								/>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Favorite;
