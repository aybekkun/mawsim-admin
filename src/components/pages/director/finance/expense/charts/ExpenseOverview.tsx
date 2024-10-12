import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
export const description = "A pie chart with a label list";
const chartData = [
	{ expense: "salary", amount: 275, fill: "var(--color-salary)" },
	{ expense: "items", amount: 200, fill: "var(--color-items)" },
	{ expense: "raw", amount: 173, fill: "var(--color-raw)" },
	{ expense: "other", amount: 90, fill: "var(--color-other)" },
];

const chartConfig = {
	expense: {
		label: "expense",
	},
	salary: {
		label: "Зарплата",
		color: "hsl(var(--chart-1))",
	},
	items: {
		label: "Товары",
		color: "hsl(var(--chart-2))",
	},
	raw: {
		label: "Заготовка",
		color: "hsl(var(--chart-3))",
	},
	other: {
		label: "Другие",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

export default function ExpenseOverview({ className = "" }) {
	return (
		<Card className={"flex flex-col " + className}>
			<CardHeader className="items-center pb-0">
				<CardTitle>Распределение Финансов</CardTitle>
				<CardDescription>За этот месяц</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip content={<ChartTooltipContent nameKey="expense" hideLabel />} />
						<Pie
							data={chartData}
							dataKey="amount"
							cx="50%"
							cy="50%"
							outerRadius={80}
							label={({ _, percent }) => `${(percent * 100).toFixed(0)}%`}
						>
							{chartData.map((entry, index) => (
								<Cell key={`cell-${index}`} /* fill={`var(--color-segment${index + 1})`} */ />
							))}
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
