import { getWorkspaceByIdAction } from "@/actions/workspace/getWorkspaceByIdAction";
import BreadcrumbComponent from "./breadcrumb";
import Profile from "./profile";
import { getProfileUser } from "@/service/getProfileUser";

const Navbar = async () => {
	const profile = await getProfileUser();

	return (
		<div className="flex items-center justify-between w-full py-5 border-b-2">
			<BreadcrumbComponent />
			<Profile profile={profile} />
		</div>
	);
};

export default Navbar;
