import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { CircularProgress, IconButton, Tooltip, useDisclosure, useToast } from "@chakra-ui/core";
import HabitCard from '@/components/common/habit-card';
import CreateHabitModal from "./CreateHabitModal";
import { firestore } from "firebase";
import FirestoreCollections from "@/lib/firestore-collections";
import HabitService from "@/lib/services/habit";
import { random } from 'lodash';

const HomePage = ({ user }) => {
	const toast = useToast();
	const habitService = useRef();
	const [loading, setLoading] = useState(true);
	const [userInfo, setUserInfo] = useState();
	const {
		onOpen: openAddHabitModal,
		isOpen: addHabitModalOpen,
		onClose: closeAddHabitModal,
	} = useDisclosure();

	useEffect(() => {
		if (user && user.uid) {
			habitService.current = new HabitService(user.uid);

			// init user basic data
			firestore()
				.collection(FirestoreCollections.USERS)
				.doc(user.uid)
				.get()
				.then((doc) => { setUserInfo(doc.data()) })
				.finally(() => setLoading(false));

			// get user habits
			habitService.current.get().then(habits => {
				console.log(habits);
			});
		}
	}, [user]);

	const createHabit = (habitData) => {
		const successMessages = [
			'We are sure you\'re going to rock!',
			'All the best! You\'ll do it! <3',
			'Your beast mode is ON!!!',
			'These first steps takes us to that level!'
		];
		return habitService.current.create(habitData).then(() => {
			toast({
				title: '🌟 Created Habit!',
				description: successMessages[random(0, successMessages.length - 1)],
				duration: 2000,
				position: 'top'
			});
		}).catch(() => {
			alert('Something went wrong!');
		});
	};

	if (loading) {
		return (
			<div className="flex flex-col items-center mt-20 justify-center">
				<div>
					<CircularProgress isIndeterminate color="red" size="2rem" />
				</div>
				<p>👻 Eating bits, it usually just a few seconds...</p>
			</div>
		);
	}

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
				onSubmit={createHabit}
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
