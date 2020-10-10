import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
	throw new Error('No Firebase config found in `.env.local`');
}

if (!firebase.apps.length) {
	firebase.initializeApp(JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG));
}
