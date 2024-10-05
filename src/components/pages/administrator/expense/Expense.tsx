import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OtherExpenses from "./otherexpenses/OtherExpenses";
import Salaries from "./salaries/Salaries";
const Expense: FC = () => {
	return (
		<>
			<Tabs defaultValue="other">
				<TabsList>
					<TabsTrigger value="other">Другие расходы</TabsTrigger>
					<TabsTrigger value="salaries">Зарплаты</TabsTrigger>
				</TabsList>
				<TabsContent value="other">
					<OtherExpenses />
				</TabsContent>
				<TabsContent value="salaries">
					<Salaries />
				</TabsContent>
			</Tabs>
		</>
	);
};

export default Expense;
