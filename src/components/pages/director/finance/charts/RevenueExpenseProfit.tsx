import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Legend } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const revenueData = [
	{ year: "2019", revenue: 5000000, profit: 1500000, expense: 1400000 },
	{ year: "2020", revenue: 5500000, profit: 1700000, expense: 2300000 },
	{ year: "2021", revenue: 6200000, profit: 2000000, expense: 3300000 },
	{ year: "2022", revenue: 7000000, profit: 2300000, expense: 4500000 },
	{ year: "2023", revenue: 7800000, profit: 2600000, expense: 1000000 },
];
interface RevenueExpenseProfit {
	className?: string;
}
export default function RevenueExpenseProfit({ className = "" }: RevenueExpenseProfit) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Годовой доход и прибыль</CardTitle>
				<CardDescription>Финансовые результаты за 5 лет</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						revenue: {
							label: "Revenue",
							color: "hsl(var(--chart-2))",
						},
						profit: {
							label: "Profit",
							color: "hsl(var(--chart-1))",
						},
						expense: {
							label: "Expense",
							color: "hsl(var(--chart-4))",
						},
					}}
					className="h-[300px] w-full"
				>
					<BarChart data={revenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
						<CartesianGrid strokeDasharray="5 5" />
						<XAxis dataKey="year" />
						<YAxis />
						<ChartTooltip content={<ChartTooltipContent />} />
						<Legend />
						<Bar dataKey="revenue" fill="var(--color-revenue)" name="Доход " />
						<Bar dataKey="expense" fill="var(--color-expense)" name="Расход " />
						<Bar dataKey="profit" fill="var(--color-profit)" name="Прибыль " />
					</BarChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
