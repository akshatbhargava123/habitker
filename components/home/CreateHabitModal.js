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
import { useState } from "react";

const CreateHabitModal = ({ onSubmit, isOpen, onClose }) => {
	const [reps, _setReps] = useState(1);
	const [type, setType] = useState('');
	const [time, setTime] = useState('');
	const [label, setLabel] = useState('');
	const [frequency, setFrequency] = useState('');
	const [submitting, setSubmitting] = useState(false);

	const setReps = value => _setReps(!!value ? Number(value) : '');
	const isValid = !!reps && type && label && frequency && time;

	const setDefaults = () => {
		const setters = [
			setType,
			setTime,
			setReps,
			setLabel,
			setFrequency,
			setSubmitting,
		];
		setters.forEach(setter => setter(''));
	};

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
					<label className="text-gray-500 w-3/5 font-semibold">
						What do you want to achieve?
					</label>
					<Input
						my="1rem"
						value={label}
						onChange={(ev) => setLabel(ev.target.value)}
						placeholder="Ex: Physical Workout"
					/>

					<Select
						defaultValue={frequency}
						onChange={value => setFrequency(value)}
						className="my-4"
						options={[
							{ label: 'Daily', value: 'daily' },
							{ label: 'Weekly', value: 'weekly' },
						]}
					/>

					<Select
						defaultValue={type}
						onChange={value => setType(value)}
						className="my-4"
						options={[
							{ label: 'Time based', value: 'time' },
							{ label: 'Reps based', value: 'reps' },
						]}
					/>

					<label className="text-gray-500 w-3/5 font-semibold">
						How many Reps?
					</label>
					<Input
						my="1rem"
						value={reps}
						type="number"
						placeholder="Enter the count (Ex: 5)"
						onChange={ev => setReps(ev.target.value)}
					/>

					<label className="text-gray-500 w-3/5 font-semibold">
						When in the day?
					</label>
					<Input
						my="1rem"
						type="time"
						value={time}
						placeholder="Start Time"
						onChange={ev => setTime(ev.target.value)}
					/>

				</DrawerBody>

				<DrawerFooter>
					<Button variant="outline" mr={3} onClick={onClose}>
						Cancel
					</Button>
					<Button
						isDisabled={!isValid}
						variantColor="blue"
						isLoading={submitting}
						onClick={() => {
							setSubmitting(true);
							onSubmit({ reps, type, time, label, frequency }).then(() => {
								setDefaults();
								onClose();
							});
						}}
					>
						Save
					</Button>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default CreateHabitModal;
