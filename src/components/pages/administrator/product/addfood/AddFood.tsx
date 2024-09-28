import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import AddFoodForm from "./AddFoodForm";
import AddFoodTable from "./AddFoodTable";

const AddFood = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex flex-wrap items-center justify-between">
						Список добавленных
						<Button size={"icon"} onClick={() => setOpen(true)}>
							<Plus />
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AddFoodTable />
				</CardContent>
			</Card>
			<AddFoodForm open={open} setOpen={(val) => setOpen(val)} />
		</>
	);
};

export default AddFood;
