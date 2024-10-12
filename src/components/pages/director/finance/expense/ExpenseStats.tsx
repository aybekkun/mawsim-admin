import { FC } from "react";
import ExpenseCards from "./charts/ExpenseCards";
import ExpenseOverview from "./charts/ExpenseOverview";
import ExpenseYear from "./charts/ExpenseYear";
import OtherExpense from "./charts/OtherExpense";
import SalaryExpense from "./charts/SalaryExpense";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ExpenseStats: FC = () => {
	return (
		<div className={"space-y-4"}>
			<ExpenseCards />
			<div className="grid gap-4 grid-cols-12">
				<ExpenseOverview className="col-span-12 xl:col-span-4" />
				<ExpenseYear className="col-span-12 xl:col-span-8" />
			</div>
			<Tabs defaultValue="other">
				<TabsList>
					<TabsTrigger value="other">Другие расходы</TabsTrigger>
					<TabsTrigger value="salary">Зарплаты</TabsTrigger>
				</TabsList>
				<TabsContent value="other">
					<OtherExpense />
				</TabsContent>
				<TabsContent value="salary">
					<SalaryExpense />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default ExpenseStats;
