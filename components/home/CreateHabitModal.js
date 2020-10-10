import {
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	Input,
} from "@chakra-ui/core";

import Select from "@/components/common/select";

const CreateHabitModal = ({ isOpen, onClose }) => {
	return (
		<Drawer
			isOpen={isOpen}
			placement="bottom"
			onClose={onClose}
		>
			<DrawerOverlay />
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerHeader>✨ Start new Habit</DrawerHeader>

				<DrawerBody>
					<Input placeholder="What do you want to achieve?" my="1rem" />

					<Select
						className="my-4"
						placeholder="Habit Type"
						options={[
							{ label: 'Daily', value: 'daily' },
							{ label: 'Weekly', value: 'weekly' },
						]}
					/>
					<Select
						className="my-4"
						placeholder="Habit Type"
						options={[
							{ label: 'Time based', value: 'time' },
							{ label: 'Reps based', value: 'reps' },
						]}
					/>

					<Input placeholder="How many Reps / Count?" my="1rem" />

					<div className="flex items-center">
						<span className="text-gray-500 w-3/5 font-semibold">Start Time:</span>
						<Input type="time" placeholder="Start Time" my="1rem" />
					</div>
					<div className="flex items-center">
						<span className="text-gray-500 w-3/5 font-semibold">End Time:</span>
						<Input type="time" placeholder="End Time" my="1rem" />
					</div>
				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button color="blue">Save</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default CreateHabitModal;
