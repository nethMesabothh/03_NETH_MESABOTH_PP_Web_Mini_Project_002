export enum STATUS {
	NOT_STARTED,
	IN_PROGRESS,
	FINISHED,
}

export type TasksType = {
	message: string;
	status: string;
	payload: {
		taskId: string;
		taskTitle: string;
		taskDetails: string;
		tag: string;
		status: string;
		startDate: string;
		endDate: string;
	}[];
};

export type TaskType = {
	message: string;
	status: string;
	payload: {
		taskId: string;
		taskTitle: string;
		taskDetails: string;
		tag: string;
		status: string;
		startDate: string;
		endDate: string;
	};
};
