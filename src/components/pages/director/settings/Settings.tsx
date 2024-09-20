import { useGetAllUsersQuery } from "@/services/auth/auth.api";
import UserCard from "./UserCard";

const Settings = () => {
	const { data } = useGetAllUsersQuery();
	console.log(data);

	return (
		<div className="grid grid-cols-1 gap-4 2xl:grid-cols-4  lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2">
			{data?.data.map((user) => <UserCard key={user.id} user={user} />)}
		</div>
	);
};

export default Settings;
