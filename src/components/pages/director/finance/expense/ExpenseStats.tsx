import { FC } from "react";
//import ExpenseCards from "./charts/ExpenseCards";
import ExpenseOverview from "./charts/ExpenseOverview";
import ExpenseYear from "./charts/ExpenseYear";

import SalaryExpense from "./charts/SalaryExpense";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import ProductsExpense from "./charts/ProductsExpense";
import FoodExpense from "./charts/FoodExpense";
import OtherExpense from "./charts/OtherExpense";

const ExpenseStats: FC = () => {
	return (
		<div className={"space-y-4"}>
			<h2 className="text-3xl font-bold tracking-tight">Расходы</h2>
			{/* 			<ExpenseCards /> */}

			<Tabs defaultValue="other">
				<ScrollArea>
					<TabsList>
						<TabsTrigger value="other">Другие расходы</TabsTrigger>
						<TabsTrigger value="food">Заготовка</TabsTrigger>
						<TabsTrigger value="products">Товары</TabsTrigger>
					</TabsList>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
				<TabsContent value="other">
					<OtherExpense />
				</TabsContent>

				<TabsContent value="food">
					<FoodExpense />
				</TabsContent>
				<TabsContent value="products">
					<ProductsExpense />
				</TabsContent>
			</Tabs>
			<div className="grid gap-4 grid-cols-12 mb-40">
				<ExpenseOverview className="col-span-12 xl:col-span-4" />
			</div>
		</div>
	);
};

export default ExpenseStats;
