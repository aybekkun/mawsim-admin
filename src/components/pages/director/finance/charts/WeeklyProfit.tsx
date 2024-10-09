import { FC, useState } from "react";
import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
interface WeeklyProfitProps {
	className?: string;
}
const salesData = [
	{ name: "Mon", total: 120000 },
	{ name: "Tue", total: 140000 },
	{ name: "Wed", total: 180000 },
	{ name: "Thu", total: 160000 },
	{ name: "Fri", total: 240000 },
	{ name: "Sat", total: 280000 },
	{ name: "Sun", total: 220000 },
];
const translations: { [key: string]: string } = {
	revenue: "Доход",
	expense: "Расход",
	profit: "Прибыль",
};

const WeeklyProfit: FC<WeeklyProfitProps> = ({ className = `` }) => {
	const [type, setType] = useState<string>("revenue");
	const onSelect = (value: string) => {
		setType(value);
	};
	const russianFormat = translations[type];
	const [date, setDate] = useState<Date>(new Date());
	return (
		<Card className={className}>
			<CardHeader>
				<div className="flex flex-row sx:flex-col gap-4 flex-wrap items-center">
					<CardTitle>Недельный</CardTitle>
					<div className="flex flex-row gap-2 flex-wrap sx:flex-col">
						<Select onValueChange={(value) => onSelect(value)} defaultValue="profit">
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Выберите вариант" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectItem value="revenue">Доход</SelectItem>
									<SelectItem value="expense">Расход</SelectItem>
									<SelectItem value="profit">Прибыль</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={"outline"}
									className={cn("justify-start text-left font-normal", !date && "text-muted-foreground")}
								>
									<CalendarIcon className="mr-2 h-4 w-4" />
									{date ? format(date, "dd-MM-yyyy") : <span>Выберите дату</span>}
								</Button>
							</PopoverTrigger>
							<PopoverContent className="w-auto p-0">
								<Calendar locale={ru} mode="single" selected={date}  onSelect={(day) => day && setDate(day)} initialFocus />
							</PopoverContent>
						</Popover>
					</div>
				</div>
			</CardHeader>
			<CardContent className="pl-2 grid grid-cols-1">
				<div className="col-span-1">
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
						<BarChart data={salesData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
							<CartesianGrid strokeDasharray="5 5" />
							<XAxis dataKey="name" />
							<YAxis />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Legend />
							<Bar dataKey="total" fill={`var(--color-${type})`} name={russianFormat} />
						</BarChart>
					</ChartContainer>
				</div>
			</CardContent>
		</Card>
	);
};

export default WeeklyProfit;
