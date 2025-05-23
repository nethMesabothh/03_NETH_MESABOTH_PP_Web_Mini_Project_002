"use client";

import { updateWorkspaceFavoriteByIdAction } from "@/actions/workspace/updateWorkspaceFavoriteByIdAction";
import { WorkSpaceByIdType } from "@/types/workspace/workspaceType";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

type props = {
	workspaceTasks: WorkSpaceByIdType["payload"];
};

const ToggleStarFavorite = ({ workspaceTasks }: props) => {
	const [isToggle, setIsToggle] = useState<boolean>(workspaceTasks.isFavorite);

	const handleOnToggle = async () => {
		const newToggleState = !isToggle;
		setIsToggle(newToggleState);

		try {
			await updateWorkspaceFavoriteByIdAction({
				workspaceId: workspaceTasks.workspaceId,
				favorite: newToggleState,
			});

			toast.success("Favorite status updated successfully!");
			window.location.reload();
		} catch (error) {
			setIsToggle((prev) => !prev);
			toast.error("Failed to update favorite status.");
		}
	};

	return (
		<div>
			<svg
				width="22"
				height="22"
				viewBox="0 0 22 22"
				fill={isToggle ? "#FFF085" : "none"}
				xmlns="http://www.w3.org/2000/svg"
				onClick={handleOnToggle}
				className="cursor-pointer"
			>
				<path
					d="M19.1 7.61001C21.14 7.95001 21.62 9.43001 20.15 10.89L17.67 13.37C17.25 13.79 17.02 14.6 17.15 15.18L17.86 18.25C18.42 20.68 17.13 21.62 14.98 20.35L11.99 18.58C11.45 18.26 10.56 18.26 10.01 18.58L7.01997 20.35C4.87997 21.62 3.57997 20.67 4.13997 18.25L4.84997 15.18C4.97997 14.6 4.74997 13.79 4.32997 13.37L1.84997 10.89C0.38997 9.43001 0.85997 7.95001 2.89997 7.61001L6.08997 7.08001C6.61997 6.99001 7.25997 6.52002 7.49997 6.03001L9.25997 2.51001C10.21 0.600015 11.77 0.600015 12.73 2.51001L14.49 6.03001C14.59 6.24001 14.77 6.45001 14.98 6.62001"
					stroke={isToggle ? "#FFF085" : "#94A3B8"}
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</div>
	);
};

export default ToggleStarFavorite;
