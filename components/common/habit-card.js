import { Checkbox, IconButton, Progress } from "@chakra-ui/core";
import { format } from "date-fns";

const HabitCard = ({
	type,
	label,
	totalReps,
	currentReps,
	startTime = new Date(),
	endTime = new Date(),
	isOverdue = false,
}) => {

	const formatTime = (time) => format(new Date(time), 'kk:mm');

	return (
		<div className="flex justify-between border-b px-2 py-2">
			<div className="w-4/5">
				<h3 className="text-lg truncate">{label}</h3>
				{type === 'reps' ? (
					<span className="text-red-500 text-sm font-bold">
						{currentReps} / {totalReps} completed
					</span>
				) : (
					<span className="text-red-500 text-sm font-bold">
						{formatTime(startTime)} - {formatTime(endTime)}
					</span>
				)}
				<span className="bg-red-500 py-px px-1 rounded text-xs text-white text-sm ml-2" hidden={!isOverdue}>
					Overdue
				</span>
			</div>
			<div className="w-auto">
				<IconButton size="sm" aria-label="Search database" icon="check" />
			</div>
		</div>
	);
};

export default HabitCard;