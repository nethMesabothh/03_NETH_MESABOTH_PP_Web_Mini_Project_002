"use client";

import { getWorkspaceByIdAction } from "@/actions/workspace/getWorkspaceByIdAction";
import { ProfileType } from "@/types/profileType";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type props = {
	profile: ProfileType["payload"];
};

const Profile = ({ profile }: props) => {
	return (
		<div className="flex items-center gap-3">
			<Image
				src={profile.profile}
				alt="profile"
				width={50}
				height={50}
				className="rounded-full"
			/>
			<div>
				<h1>{profile.username}</h1>
				<p className="text-xs text-green-500">{profile.email}</p>
			</div>
		</div>
	);
};

export default Profile;
