import { Cell, Pie, PieChart } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { SelectDate } from "@/components/shared/SelectDate/SelectDate";
import { useState } from "react";
import { useGetExpenseQuery } from "@/services/director/director.api";
import { format } from "date-fns";
import { TGrossResponse } from "@/services/director/director.types";
import { useDateRange } from "@/hooks/useDateRange.hook";

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
	salaries: {
		label: "Зарплата",
		color: "hsl(var(--chart-1))",
	},
	expenses_food: {
		label: "Товары",
		color: "hsl(var(--chart-2))",
	},
	expenses_product: {
		label: "Заготовка",
		color: "hsl(var(--chart-3))",
	},
	other_expenses: {
		label: "Другие",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

export default function ExpenseOverview({ className = "" }) {
	const { date, updateFromDate, updateToDate } = useDateRange();
	const { data } = useGetExpenseQuery({
		from: date.from,
		to: date.to,
	});
	const chartData = transformExpenses(data?.data);


	return (
		<Card className={"flex flex-col mb-40" + className}>
			<CardHeader className="">
				<CardTitle>Распределение Финансов</CardTitle>
				<CardDescription>За этот день</CardDescription>
				<div className="flex gap-1 items-center">
					<SelectDate title="От" month={-1} setCurrentPage={() => {}} selectDate={updateFromDate} />
					<SelectDate title="До" month={0} setCurrentPage={() => {}} selectDate={updateToDate} />
				</div>
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
type TransformedExpense = {
	expense: string;
	amount: number;
	fill: string;
};
type Expenses = {
	expenses_product: number;
	expenses_food: number;
	other_expenses: number;
	salaries: number;
	date: string;
};

function transformExpenses(expenses: TGrossResponse["data"] | undefined) {
	if (!expenses) return [];
	const fillColors = {
		expenses_product: "var(--color-expenses_product)",
		expenses_food: "var(--color-expenses_food)",
		other_expenses: "var(--color-other_expenses)",
		salaries: "var(--color-salaries)",
	};

	return Object.keys(expenses)
		.filter((key) => key !== "date"&& key !== "gross_profit"&& key !== "orders") // Исключаем поле даты
		.map((key) => ({
			expense: key,
			amount: Number(expenses[key as keyof TGrossResponse["data"]]),
			fill: fillColors[key as keyof typeof fillColors] || "var(--color-default)", // Используем цвет или значение по умолчанию
		}));
}
