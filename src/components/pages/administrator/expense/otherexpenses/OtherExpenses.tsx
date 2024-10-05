import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import OtherExpensesTable from "./OtherExpensesTable";
import OtherExpensesForm from "./OtherExpensesForm";

const OtherExpenses = () => {
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
					<OtherExpensesTable />
				</CardContent>
			</Card>
			<OtherExpensesForm open={open} setOpen={setOpen} type="create"/>
		</>
	);
};

export default OtherExpenses;
