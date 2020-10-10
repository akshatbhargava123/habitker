import { auth } from 'firebase';
import { LogOut } from "react-feather";
import { useRouter } from 'next/router';

const Header = () => {
	const router = useRouter();

	const logout = () => {
		auth().signOut().then(() => router.push('/login'));
	};

	return (
		<div className="h-12 flex justify-between items-center px-4 shadow">
			<h3 className="font-bold text-xl">
				HabitKer
			</h3>
			{auth().currentUser && <LogOut onClick={logout} />}
		</div>
	);
};

export default Header;
