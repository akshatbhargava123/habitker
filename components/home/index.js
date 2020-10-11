import { useEffect, useRef, useState } from "react";
import { format, parse } from "date-fns";
import { Button, CircularProgress, IconButton, Tooltip, useDisclosure, useToast } from "@chakra-ui/core";
import HabitCard from '@/components/common/habit-card';
import CreateHabitModal from "./CreateHabitModal";
import { firestore } from "firebase";
import FirestoreCollections from "@/lib/firestore-collections";
import HabitService from "@/lib/services/habit";
import { get, random } from 'lodash';

const HomePage = ({ user }) => {
	const toast = useToast();
	const habitService = useRef();
	const [habits, setHabits] = useState([]);
	const [habitStatus, setHabitStatus] = useState({});
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
				.finally(() => {}/*setLoading(false)*/);

				initHabits();
		}
	}, [user]);

	const initHabits = () => {
		// get user habits
		return habitService.current.get().then(({ habits, habitStatus }) => {
			// sorting by complete-ness
			const sortedHabits = habits.sort((h1, h2) => {
				const s1 = get(habitStatus, `${h2.id}.completed`, 0);
				const s2 = get(habitStatus, `${h1.id}.completed`, 0);
				return s2 - s1;
			});

			setHabits(sortedHabits);
			setHabitStatus(habitStatus);

			setLoading(false);
		});
	};

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
			initHabits();
		}).catch(() => {
			alert('Something went wrong!');
		});
	};

	const onComplete = (habitData) => {
		return habitService.current
			.step(habitData.id, habitData)
			.then(initHabits);
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
			{!!habits.length && (
				<div>
					<h1 className="font-bold text-gray-600 text-lg my-3">
						Today · {format(new Date(), 'E dd LLL')}
					</h1>
					<div className="habits-scroll-area overflow-y-scroll mb-20">
						{habits.map(habit => (
							<HabitCard
								key={habit.id}
								type={habit.type}
								label={habit.label}
								totalReps={habit.reps}
								time={parse(habit.time, 'HH:mm', new Date())}
								currentReps={get(habitStatus, `${habit.id}.curReps`, 0)}
								completed={get(habitStatus, `${habit.id}.completed`, false)}
								onComplete={() => onComplete(habit)}
							/>
						))}
					</div>
				</div>
			)}
			{!habits.length && (
				<div className="mt-10 flex flex-col items-center justify-between">
					<img src="/images/home.svg" />
					<h4 className="font-bold mt-5 mb-2">Welcome {userInfo.name}</h4>
					<p className="font-thin mb-5 text-lg">
						Let's take the first step to reach that goal!
					</p>
					<Button variantColor="red" onClick={openAddHabitModal}>
						Start new Habit
					</Button>
				</div>
			)}

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
			<style jsx>{`
				.habits-scroll-area {
					height: calc(100vh - 18rem);
				}
			`}</style>
		</div>
	);
};

export default HomePage;
