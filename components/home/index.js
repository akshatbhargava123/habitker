import { format } from "date-fns";
import HabitCard from '@/components/common/habit-card';

const HomePage = () => {

	return (
		<div className="px-4 py-2">
			<h1 className="font-bold text-gray-600 text-lg my-3">
				Today · {format(new Date(), 'E dd LLL')}
			</h1>
			<HabitCard
				time={new Date()}
				label="School Homework"
				type="reps"
				currentReps={1}
				totalReps={4}
				isOverdue
			/>
			<HabitCard
				label="School Homework"
				type="time"
				currentReps={1}
				totalReps={4}
			/>
			<HabitCard
				label="School Homework"
				type="time"
				currentReps={1}
				totalReps={4}
			/>
		</div>
	);
};

export default HomePage;
