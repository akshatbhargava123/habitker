import { useEffect } from "react";
import { format } from "date-fns";
import { IconButton, Tooltip, useDisclosure } from "@chakra-ui/core";
import HabitCard from '@/components/common/habit-card';
import CreateHabitModal from "./CreateHabitModal";

const HomePage = () => {
	const {
		onOpen: openAddHabitModal,
		isOpen: addHabitModalOpen,
		onClose: closeAddHabitModal,
	} = useDisclosure();

	return (
		<div className="px-4 py-2">
			<h1 className="font-bold text-gray-600 text-lg my-3">
				Today · {format(new Date(), 'E dd LLL')}
			</h1>
			<div className="overflow-y-scroll">
				<HabitCard
					time={new Date()}
					label="School Homework"
					type="reps"
					currentReps={1}
					totalReps={4}
					isOverdue
				/>
				{new Array(5).fill(0).map((item, i) => (
					<HabitCard
						key={i}
						label="School Homework"
						type="time"
						currentReps={1}
						totalReps={4}
					/>
				))}
			</div>

			<CreateHabitModal
				isOpen={addHabitModalOpen}
				onClose={closeAddHabitModal}
			/>
			<div className="absolute right-0 m-5" style={{ bottom: '4vh' }}>
				<Tooltip label="Start new Habit">
					<IconButton
						size="lg"
						icon="add"
						rounded="full"
						variantColor="red"
						onClick={openAddHabitModal}
					/>
				</Tooltip>
			</div>
		</div>
	);
};

export default HomePage;
