import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import AddRawNameForm from "./AddRawNameForm";
import { Plus } from "lucide-react";
import AddRawNameTable from "./AddRawNameTable";

const AddRawName = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex flex-wrap items-center justify-between">
						Список названия{" "}
						<Button size={"icon"} onClick={() => setOpen(true)}>
							<Plus />
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AddRawNameTable />
				</CardContent>
			</Card>
			<AddRawNameForm open={open} setOpen={setOpen} />
		</>
	);
};

export default AddRawName;
