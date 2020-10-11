import { auth } from 'firebase';
import { useState } from 'react';
import { Button, useToast } from '@chakra-ui/core';

const LoginPage = ({ authStatusLoading }) => {
	const toast = useToast();
	const [loading, setLoading] = useState(false);

	const login = () => {
		setLoading(true);

		const googleAuthProvider = new auth.GoogleAuthProvider();
		auth().signInWithPopup(googleAuthProvider).then(res => {
			const { user } = res;
			toast({
				title: `Welcome ${user.displayName}`,
				status: 'success',
				duration: 2000,
			});
		}).catch((error) => {
			console.error(error)
			toast({
				title: 'Error, something went wrong!',
				description: JSON.stringify(error),
				status: 'error',
				duration: 2000,
			});
		}).finally(() => {
			setLoading(false);
		});
	};

	return (
		<div className="px-5 my-10">
			<div className="flex "><img src="/images/welcome.svg" /></div>
			<h3 className="text-gray-600 font-bold text-2xl my-10">
				Let's start your journey of self-improvement, please sign-in to continue...
			</h3>
			<Button
				color="red.500"
				border="1px"
				fontWeight="bold"
				backgroundColor="white"
				onClick={login}
				isLoading={loading || authStatusLoading}
			>
				Continue with Google
			</Button>
		</div>
	);
};

export default LoginPage;
