"use client";

import { getAllWorkspaceAction } from "@/actions/workspace/getAllWorkspaceAction";
import {
	WorkspacePayloadType,
	WorkspaceType,
} from "@/types/workspace/workspaceType";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import UpdateWorkspaceComponent from "./update-workspace";

const Favorite = () => {
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
				<h1>Favorite</h1>
				<Image src="/star.png" alt="start" width={22} height={20} />
			</div>
			<div className="flex flex-col gap-2 mt-4 w-full">
				{workspaces
					?.filter((workspace) => workspace.isFavorite == true)
					.map((workspace) => {
						return (
							<div
								key={workspace.workspaceId}
								className="flex items-center justify-between"
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
						);
					})}
			</div>
		</div>
	);
};

export default Favorite;
