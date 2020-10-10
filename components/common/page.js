import { useRouter } from 'next/router';
import Head from 'next/head';
import { auth } from 'firebase';
import { useEffect } from 'react';

const Page = ({ title, children, layoutProvider }) => {
	const router = useRouter();
	const layoutedChild = layoutProvider ? layoutProvider(children) : children;

	useEffect(() => {
		auth().onAuthStateChanged(user => {
			if (user.uid) {
				if (router.pathname === '/login') router.push('/');
			} else if (router.pathname !== '/login') {
				router.push('/login');
			}
		});
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
				{layoutedChild()}
			</div>
		</div>
	);
};

export default Page;
