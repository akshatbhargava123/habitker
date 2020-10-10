import { Button } from '@chakra-ui/core';
import { auth } from 'firebase';
import { useState } from 'react';

const LoginPage = () => {
	const [loading, setLoading] = useState(false);

	const login = () => {
		setLoading(true);
		auth().signInWithPopup(new auth.GoogleAuthProvider()).then(res => {
			const { user } = res;
			console.log(user);
		}).catch(() => {
			alert('Something surely went wrong! :(');
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
				isLoading={loading}
			>
				Continue with Google
			</Button>
		</div>
	);
};

export default LoginPage;
