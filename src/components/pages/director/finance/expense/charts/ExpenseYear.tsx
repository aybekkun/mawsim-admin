import { FC } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ExpenseYearProps {
	className?: string;
}

const monthlyData = [
	{ name: "Январь", items: 5000, salary: 3000, raw: 2000, other: 500 },
	{ name: "Февраль", items: 5000, salary: 3200, raw: 2100, other: 300 },
	{ name: "Март", items: 5000, salary: 3500, raw: 2200, other: 800 },
	{ name: "Апрель", items: 5000, salary: 3300, raw: 2000, other: 200 },
	{ name: "Май", items: 5000, salary: 3800, raw: 2300, other: 600 },
	{ name: "Июнь", items: 5000, salary: 4000, raw: 2100, other: 400 },
];

const ExpenseYear: FC<ExpenseYearProps> = ({ className = `` }) => {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Распределение затрат</CardTitle>
				<CardDescription>
					Визуализация расходов на зарплаты, товары, заготовку и непредвиденные затраты за последние 6 месяцев.
				</CardDescription>
			</CardHeader>
			<CardContent className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={monthlyData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="items" stackId="a" fill="#2A9D90" name="Товары" />
						<Bar dataKey="raw" stackId="a" fill="#274754" name="Заготовка" />
						<Bar dataKey="other" stackId="a" fill="#F4A462" name="Другие" />
						<Bar dataKey="salary" stackId="a" fill="#E76E50" name="Зарплаты" />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default ExpenseYear;
