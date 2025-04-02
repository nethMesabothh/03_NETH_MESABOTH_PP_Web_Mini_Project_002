export type WorkspaceType = {
	message: string;
	status: string;
	payload: [
		{
			workspaceId: string;
			workspaceName: string;
			isFavorite: boolean;
		}
	];
};

export type WorkspaceCreateType = {
	message: string;
	status: string;
	payload: {
		workspaceId: string;
		workspaceName: string;
		isFavorite: boolean;
	};
};

export type Workspace = {
	workspaceId: string;
	workspaceName: string;
	isFavorite: boolean;
};

export type WorkspacePayloadType = {
	payload: Workspace[];
};

export type WorkSpaceByIdType = {
	message: string;
	status: string;
	payload: {
		workspaceId: string;
		workspaceName: string;
		isFavorite: boolean;
	};
};

export type WorkspaceFavoriteType = {
	message: string;
	status: string;
	payload: {
		workspaceId: string;
		workspaceName: string;
		isFavorite: boolean;
	};
};
