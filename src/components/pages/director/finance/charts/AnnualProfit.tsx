import { Line, LineChart, XAxis, YAxis, CartesianGrid } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const stockData = [
	{ date: "2023-01-01", price: 150 },
	{ date: "2023-02-01", price: 155 },
	{ date: "2023-03-01", price: 159 },
	{ date: "2023-04-01", price: 165 },
	{ date: "2023-05-01", price: 168 },
	{ date: "2023-06-01", price: 172 },
	{ date: "2023-07-01", price: 178 },
	{ date: "2023-08-01", price: 180 },
	{ date: "2023-09-01", price: 180 },
	{ date: "2023-10-01", price: 180 },
	{ date: "2023-11-01", price: 180 },
	{ date: "2023-12-01", price: 280 },
];
interface AnnualProfit {
	className?: string;
}
export default function Chart1({ className = "" }: AnnualProfit) {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Прибыль за год</CardTitle>
				<CardDescription>за 12 месяцев</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						price: {
							label: "Stock Price",
							color: "hsl(var(--chart-1))",
						},
					}}
					className="h-[300px] w-full"
				>
			
						<LineChart data={stockData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="1 1" />
							<XAxis dataKey="date" />
							<YAxis />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Line type="monotone" dataKey="price" stroke="var(--color-price)" name="Stock Price" />
						</LineChart>
					
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
