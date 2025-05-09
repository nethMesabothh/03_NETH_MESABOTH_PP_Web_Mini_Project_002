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

export type CreateTaskType = {
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

export type CreateTaskProps = {
	taskTitle: string;
	taskDetails: string;
	tag: string;
	endDate: string;
};

export type DeleteTaskType = {
	message: string;
	status: string;
};

export type UpdateTaskType = {
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
