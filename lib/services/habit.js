import { format } from "date-fns";
import { firestore } from "firebase";
import { get } from "lodash";
import FirestoreCollections from "../firestore-collections";

export default class HabitService {
	constructor(userId) {
		const userCollection = firestore().collection(FirestoreCollections.USERS);
		this.userDoc = userCollection.doc(userId);
		this.habitCollection = this.userDoc.collection(FirestoreCollections.HABITS);
		this.statusCollection = this.userDoc.collection(FirestoreCollections.HABIT_STATUS);
	}

	async get() {
		// fetch all habits
		const habitsRef = await this.habitCollection.get();
		const habits = habitsRef.docs.map(habit => habit.data());

		// fetch status for today's date
		const todayDate = format(new Date(), 'DDD-yyyy');
		const statusRef = await this.statusCollection.doc(todayDate).get();
		const habitStatus = statusRef.data();

		return { habits, habitStatus };
	}

	create(habitData) {
		// TODO: add data validation
		const id = this.habitCollection.doc().id;
		return this.habitCollection.doc(id).set({ id, ...habitData });
	}

	async step(habitId, habitData) {
		/*
			stepping on habit means if habit is reps based
			then increase the completed rep / count by 1
			else simply mark it completed 
		*/
		const todayDate = format(new Date(), 'DDD-yyyy');

		const habitStatusRef = this.statusCollection.doc(todayDate);

		let habitStatusData = (await habitStatusRef.get()).data() || {};

		habitStatusData[habitId] = get(habitStatusData, habitId, {
			completed: false,
			curReps: 0,
		});

		const updateData = (data) => {
			console.log('updating with: ');
			console.log(data)
			return habitStatusRef.set({ [habitId]: data }, { merge: true });
		};

		// cannot step further if already completed
		if (habitStatusData[habitId].completed) return;

		let res;
		if (habitData.type === 'time') {
			res = await updateData({ completed: true });
		} else {
			let updatedReps = 1 + get(habitStatusData[habitId], 'curReps', 0);
			if (updatedReps === habitData.reps) {
				res = await updateData({ curReps: updatedReps, completed: true });
			} else {
				res = await updateData({ curReps: updatedReps });
			}
		}

		return res;
	}

	delete(habitId) {
		return this.habitCollection.doc(habitId).delete();
	}
};
