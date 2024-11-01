
import { useState } from "react";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import AddUser from "./AddUser";
import UsersTable from "./UsersTable";

const Settings = () => {
	const [open, setOpen] = useState(false);
	return (
		<div className="space-y-4">
			<Button size={"icon"} onClick={() => setOpen(true)}>
				<Plus />
			</Button>
			<AddUser open={open} setOpen={setOpen} />
			<UsersTable />
		</div>
	);
};

export default Settings;
