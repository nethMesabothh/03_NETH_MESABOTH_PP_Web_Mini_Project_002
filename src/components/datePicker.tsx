"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Noop, RefCallBack } from "react-hook-form";
import { FormControl } from "./ui/form";
import { useState } from "react";
import { TaskType } from "@/types/tasks/TaskType";

type props = {
	onChange: (...event: any[]) => void;
	onBlur: Noop;
	value: Date;
	disabled?: boolean | undefined;
	name: "endDate";
	ref: RefCallBack;
	initialTask: TaskType["payload"] | null;
};

export function DatePicker({ value, onChange, initialTask }: props) {
	const [open, setOpen] = useState<boolean>();

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<FormControl>
					<Button
						variant={"outline"}
						className={cn(
							"w-full pl-3 text-left font-normal",
							!value && "text-muted-foreground"
						)}
					>
						{value ? format(value, "PPP") : <span>Pick a date</span>}
						<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
					</Button>
				</FormControl>
			</PopoverTrigger>
			<PopoverContent className="w-auto p-0" align="start">
				<Calendar
					mode="single"
					selected={value}
					onSelect={onChange}
					fromDate={new Date()}
					initialFocus
					required
				/>
			</PopoverContent>
		</Popover>
	);
}
