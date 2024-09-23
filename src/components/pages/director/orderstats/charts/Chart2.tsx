import * as React from "react";
import { Label, Pie, PieChart } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

export const description = "A donut chart with text";

const chartData = [
	{ productName: "Сомса", visitors: 275, fill: "hsl(var(--chart-1))" },
	{ productName: "Кола 1.5л", visitors: 200, fill: "hsl(var(--chart-2))" },
	{ productName: "firefox", visitors: 287, fill: "hsl(var(--chart-3))" },
	{ productName: "edge", visitors: 173, fill: "hsl(var(--chart-4))" },
	{ productName: "other", visitors: 190, fill: "hsl(var(--chart-5))" },
];

const chartConfig = {
	visitors: {
		label: "Заказы",
	},
} satisfies ChartConfig;

export default function Chart2() {
	const totalVisitors = React.useMemo(() => {
		return chartData.reduce((acc, curr) => acc + curr.visitors, 0);
	}, []);

	return (
		<Card className="flex flex-col">
			<CardHeader className="items-center pb-0">
				<CardTitle>Доля продаж</CardTitle>
				<CardDescription>January - December 2024</CardDescription>
			</CardHeader>
			<CardContent className="flex-1 pb-0">
				<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
					<PieChart>
						<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
						<Pie data={chartData} dataKey="visitors" nameKey="productName" fill="fill" innerRadius={60} strokeWidth={5}>
							<Label
								content={({ viewBox }) => {
									if (viewBox && "cx" in viewBox && "cy" in viewBox) {
										return (
											<text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
												<tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
													{totalVisitors.toLocaleString()}
												</tspan>
												<tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
													Visitors
												</tspan>
											</text>
										);
									}
								}}
							/>
						</Pie>
					</PieChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col gap-2 text-sm">
				<div className="leading-none text-muted-foreground">Топ заказы</div>
			</CardFooter>
		</Card>
	);
}
