import { format } from "date-fns";
import HabitCard from '@/components/common/habit-card';
import { Button, IconButton } from "@chakra-ui/core";

const HomePage = () => {

	return (
		<div className="px-4 py-2">
			<h1 className="font-bold text-gray-600 text-lg my-3">
				Today · {format(new Date(), 'E dd LLL')}
			</h1>
			<div className="overflow-y-scroll h-full">
				<HabitCard
					time={new Date()}
					label="School Homework"
					type="reps"
					currentReps={1}
					totalReps={4}
					isOverdue
				/>
				{new Array(50).fill(0).map((item, i) => (
					<HabitCard
						key={i}
						label="School Homework"
						type="time"
						currentReps={1}
						totalReps={4}
					/>
				))}
			</div>

			<div className="absolute bottom-0 right-0 m-5">
				<IconButton rounded="full" size="lg" variantColor="red" icon="add" />
			</div>
		</div>
	);
};

export default HomePage;
