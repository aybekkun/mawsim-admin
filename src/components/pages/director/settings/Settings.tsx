import { useGetAllUsersQuery } from "@/services/auth/auth.api";
import UserCard from "./UserCard";
import { useState } from "react";
import UserEditForm from "./UserEditForm";

const Settings = () => {
	const [editId, setEditId] = useState(0);
	const { data } = useGetAllUsersQuery();

	return (
		<div className="max-w-3xl mx-auto space-y-4">
			{data?.data.map((user) =>
				editId === user.id ? (
					<UserEditForm key={user.id} user={user} setEditId={setEditId} />
				) : (
					<UserCard key={user.id} user={user} setEditId={setEditId} />
				)
			)}
		</div>
	);
};

export default Settings;
