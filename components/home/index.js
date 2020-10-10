import { Checkbox, IconButton, Progress } from "@chakra-ui/core";
import { format } from "date-fns";

const HomePage = () => {

	return (
		<div className="px-4 py-2">
			<h1 className="font-bold text-gray-600 text-lg my-3">
				Today · {format(new Date(), 'E dd LLL')}
			</h1>
			<div className="flex justify-between border-t border-b px-2 py-2">
				<div className="w-4/5">
					<h3 className="text-lg truncate">Do School's Homework Homework Homework Homework</h3>
					<p className="text-red-500 text-sm">
						1 / 4 completed
					</p>
				</div>
				<div className="w-auto">
					<IconButton size="sm" aria-label="Search database" icon="check" />
				</div>
			</div>
		</div>
	);
};

export default HomePage;
