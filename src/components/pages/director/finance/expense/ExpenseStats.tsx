import { FC } from "react";
//import ExpenseCards from "./charts/ExpenseCards";
import ExpenseOverview from "./charts/ExpenseOverview";
import ExpenseYear from "./charts/ExpenseYear";
import OtherExpense from "./charts/OtherExpense";
import SalaryExpense from "./charts/SalaryExpense";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const ExpenseStats: FC = () => {
	return (
		<div className={"space-y-4"}>
			<h2 className="text-3xl font-bold tracking-tight">Расходы</h2>
			{/* 			<ExpenseCards /> */}
			<div className="grid gap-4 grid-cols-12">
				<ExpenseOverview className="col-span-12 xl:col-span-4" />
				<ExpenseYear className="col-span-12 xl:col-span-8" />
			</div>
			<Tabs defaultValue="other">
				<ScrollArea>
					<TabsList>
						<TabsTrigger value="other">Другие расходы</TabsTrigger>
						<TabsTrigger value="salary">Зарплаты</TabsTrigger>
						<TabsTrigger value="raw">Заготовка</TabsTrigger>
						<TabsTrigger value="items">Товары</TabsTrigger>
					</TabsList>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<TabsContent value="other">
					<OtherExpense />
				</TabsContent>
				<TabsContent value="salary">
					<SalaryExpense />
				</TabsContent>
				<TabsContent value="raw">ТАБЛЦИА РАСХОДОВ</TabsContent>
				<TabsContent value="items">ТАБЛЦИА РАСХОДОВ</TabsContent>
			</Tabs>
		</div>
	);
};

export default ExpenseStats;
