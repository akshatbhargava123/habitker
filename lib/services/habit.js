import { firestore } from "firebase";
import FirestoreCollections from "../firestore-collections";

export default class HabitService {
	constructor(userId) {
		const UserCollection = firestore().collection(FirestoreCollections.USERS);
		this.userDoc = UserCollection.doc(userId);
		this.habitCollection = this.userDoc.collection('habits');
	}

	get() {
		return this.habitCollection.get().then(ref => {
			const habits = ref.docs.map(doc => doc.data());
			return habits;
		});
	}

	create(habitData) {
		// TODO: add data validation
		const id = this.habitCollection.doc().id;
		return this.habitCollection.doc(id).set({
			...habitData
		});
	}

	async step(habitId) {
		/*
			stepping on habit means if habit is reps based
			then increase the rep / count by 1
			else simply mark it completed 
		*/
		const habitDoc = await this.habitCollection.doc(habitId).get();
		const habit = habitDoc.data();
	}

	delete(habitId) {
		return this.habitCollection.doc(habitId).delete();
	}
};
