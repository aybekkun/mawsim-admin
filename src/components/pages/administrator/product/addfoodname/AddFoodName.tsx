import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddFoodNameTable from "./AddFoodNameTable";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddFoodNameForm from "./AddFoodNameForm";

const AddFoodName = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex flex-wrap items-center justify-between">
						Список названия
						<Button size={"icon"} onClick={() => setOpen(true)}>
							<Plus />
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AddFoodNameTable />
				</CardContent>
			</Card>
			<AddFoodNameForm open={open} setOpen={(val) => setOpen(val)} />
		</>
	);
};

export default AddFoodName;
