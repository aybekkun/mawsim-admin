import { useGetAllUsersQuery } from "@/services/auth/auth.api";
import UserCard from "./UserCard";
import { useState } from "react";
import UserEditForm from "./UserEditForm";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddUser from "./AddUser";

const Settings = () => {
	const [editId, setEditId] = useState(0);
	const { data } = useGetAllUsersQuery();
	const [open, setOpen] = useState(false);
	return (
		<div className="max-w-3xl mx-auto space-y-4">
			<Button size={"icon"} onClick={() => setOpen(true)}>
				<Plus />
			</Button>
			<AddUser open={open} setOpen={setOpen}/>
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
