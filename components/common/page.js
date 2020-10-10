import Head from 'next/head';
import { auth, firestore } from 'firebase';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import FirestoreCollections from '@/lib/firestore-collections';

const Page = ({ title, children, layoutProvider }) => {
	const router = useRouter();
	const [user, setUser] = useState();
	const [authStatusLoading, setAuthStatusLoading] = useState(true);
	const layoutedChild = layoutProvider ? layoutProvider(children) : children;

	useEffect(() => {
		const unsubscribe = auth().onAuthStateChanged(user => {
			setAuthStatusLoading(false);
			if (user && user.uid) {
				setUser(user);

				firestore()
				.collection(FirestoreCollections.USERS)
				.doc(user.uid)
				.set(
					{
						uid: user.uid,
						name: user.displayName,
						email: user.email,
					},
					{ merge: true }
				).then(() => {
					if (router.pathname === '/login') router.push('/');
				});

			} else if (router.pathname !== '/login') {
				router.push('/login');
			}
		});

		return unsubscribe;
	}, []);

	return (
		<div>
			<Head>
				<title>{title} - HabitTracker</title>
				<link rel="icon" href="/favicon.ico" />
				<link href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" rel="stylesheet" />
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
				<link rel="icon" type="image/svg" sizes="32x32" href="/favicon.svg" />
				<meta charSet="utf-8" />
			</Head>
			<div className="w-screen select-none">
				{layoutedChild({ user, authStatusLoading })}
			</div>
		</div>
	);
};

export default Page;
