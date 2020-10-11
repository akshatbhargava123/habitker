import { IconButton } from "@chakra-ui/core";
import { differenceInMinutes, format } from "date-fns";
import { useState } from "react";

const HabitCard = ({
	type,
	label,
	totalReps,
	currentReps,
	time,
	completed,
	onComplete,
}) => {
	const [stepping, setStepping] = useState(false);
	const isOverdue = differenceInMinutes(new Date(), time) <= 0;

	return (
		<div className="flex items-center justify-between border-b px-2 py-2">
			<div className="w-4/5">
				<h3 className="text-lg truncate">
					{label}
					<span className="text-xs text-gray-500 ml-2">Personal</span>
				</h3>
				{type === 'reps' ? (
					<span className="text-red-500 text-sm font-bold">
						{currentReps} / {totalReps} completed
					</span>
				) : (
					<span className="text-red-500 text-sm font-bold">
						{format(new Date(time), 'kk:mm')}
					</span>
				)}
				{type === 'time' && isOverdue && (
					<span className="bg-red-500 py-px px-1 rounded text-xs text-white text-sm ml-2" hidden={!isOverdue}>
						Overdue
					</span>
				)}
			</div>
			{completed ? (
				<div className="w-auto">
					<p className="text-2xl ping">🎉</p>
				</div>
			) : (
				<div className="w-auto">
					<IconButton
						size="sm"
						aria-label="Proceed to next step"
						icon="check"
						isLoading={stepping}
						onClick={() => {
							setStepping(true);
							onComplete().then(() => {
								setStepping(false);
							});
						}}
					/>
				</div>
			)}
			<style jsx>{`
				.ping {
					animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) 1;
				}

				@keyframes ping {
					0% {
						transform: scale(1);
						opacity: 0;
					}
					75%, 100% {
						transform: scale(1.25);
						opacity: 1;
					}
				}
			`}</style>
		</div>
	);
};

export default HabitCard;