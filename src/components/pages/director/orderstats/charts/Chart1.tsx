import { Bar, BarChart, CartesianGrid, LabelList, XAxis, ResponsiveContainer, YAxis } from "recharts";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { useMediaQuery } from "react-responsive";
import { useGetOrderStatsQuery } from "@/services/director/director.api";
import { useState } from "react";
export const description = "A bar chart with a label";

const chartConfig = {
	order: {
		label: "Заказы",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export default function Chart1({ className = " " }: { className?: string }) {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
	const [currentPage, setCurrentPage] = useState(1);
	const { data } = useGetOrderStatsQuery({ page: currentPage, from: "2024-01-01", to: "2024-12-31" });
	const chartData = data?.data || [];
	if (isMobile) {
		return (
			<Card>
				<CardHeader>
					<CardTitle>Статиска по заказам</CardTitle>
				</CardHeader>
				<CardContent>
					<ChartContainer config={chartConfig}>
						<BarChart
							accessibilityLayer
							data={chartData}
							layout="vertical"
							margin={{
								left: -20,
							}}
						>
							<XAxis type="number" dataKey="total_orders" hide />
							<YAxis
								dataKey="month"
								type="category"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Bar dataKey="total_orders" fill="var(--color-order)" radius={5} />
						</BarChart>
					</ChartContainer>
				</CardContent>
				<CardFooter className="flex-col items-start gap-2 text-sm">
					<div className="leading-none text-muted-foreground">Показаны общие заказы за последние 12 месяцев</div>
				</CardFooter>
			</Card>
		);
	}

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Статиска по заказам</CardTitle>
			</CardHeader>
			<CardContent>
				<ResponsiveContainer height={320}>
					<ChartContainer config={chartConfig}>
						<BarChart
							accessibilityLayer
							data={chartData}
							margin={{
								top: 20,
							}}
						>
							<CartesianGrid vertical={false} />
							<XAxis
								dataKey="month"
								tickLine={false}
								tickMargin={10}
								axisLine={false}
								tickFormatter={(value) => value.slice(0, 3)}
							/>
							<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
							<Bar name="Заказы" dataKey="total_orders" fill="var(--color-order)" radius={8}>
								<LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
							</Bar>
						</BarChart>
					</ChartContainer>
				</ResponsiveContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 text-sm">
				<div className="leading-none text-muted-foreground">Показаны общие заказы</div>
			</CardFooter>
		</Card>
	);
}
