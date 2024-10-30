import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import RawMaterialsExpenseTable from "./RawMaterialsExpenseTable";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import RawMaterialsExpenseForm from "./RawMaterialsExpenseForm";

const RawMaterialsExpense = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex flex-wrap items-center justify-between">
						Список расходов
						<Button size={"icon"} onClick={() => setOpen(true)}>
							<Plus />
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<RawMaterialsExpenseTable />
				</CardContent>
			</Card>
			<RawMaterialsExpenseForm type="create" open={open} setOpen={setOpen} />
		</>
	);
};

export default RawMaterialsExpense;
