import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useMediaQuery } from "react-responsive";
import SelectYear from "@/components/shared/SelectDate/SelectYear";

interface ExpenseYearProps {
	className?: string;
}

const monthlyData = [
	{ name: "Янв", items: 5000, salary: 3000, raw: 2000, other: 500 },
	{ name: "Фев", items: 5500, salary: 3200, raw: 2100, other: 320 },
	{ name: "Мар", items: 2000, salary: 3500, raw: 2200, other: 820 },
	{ name: "Апр", items: 3000, salary: 3300, raw: 2000, other: 230 },
	{ name: "Май", items: 5000, salary: 3800, raw: 2300, other: 600 },
	{ name: "Июн", items: 5000, salary: 4000, raw: 2100, other: 440 },
	{ name: "Июль", items: 4000, salary: 3000, raw: 2000, other: 530 },
	{ name: "Авг", items: 5400, salary: 3200, raw: 2100, other: 300 },
	{ name: "Сен", items: 5200, salary: 3500, raw: 2200, other: 820 },
	{ name: "Окт", items: 5040, salary: 3300, raw: 2000, other: 200 },
	{ name: "Ноя", items: 5000, salary: 3800, raw: 2300, other: 600 },
	{ name: "Дек", items: 5000, salary: 4000, raw: 2100, other: 400 },
];

const ExpenseYear: FC<ExpenseYearProps> = ({ className = `` }) => {
	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	if (isMobile) {
		return (
			<Card className={className}>
				<CardHeader>
					<CardTitle>Распределение затрат</CardTitle>
					<SelectYear />
				</CardHeader>
				<CardContent className="h-[500px]">
					<ResponsiveContainer width="100%" height="100%">
						<BarChart layout="vertical" data={monthlyData}>
							<CartesianGrid strokeDasharray="3 3" />
							<XAxis />
							<YAxis dataKey="name" type="category" />
							<Tooltip />
							<Bar dataKey="items" fill="#2A9D90" name="Товары" />
							<Bar dataKey="raw" fill="#274754" name="Заготовка" />
							<Bar dataKey="other" fill="#F4A462" name="Другие" />
							<Bar dataKey="salary" fill="#E76E50" name="Зарплаты" />
							<Legend />
						</BarChart>
					</ResponsiveContainer>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Распределение затрат</CardTitle>
				<SelectYear />
			</CardHeader>
			<CardContent className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart layout="horizontal" data={monthlyData}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Bar dataKey="items" fill="#2A9D90" name="Товары" />
						<Bar dataKey="raw" fill="#274754" name="Заготовка" />
						<Bar dataKey="other" fill="#F4A462" name="Другие" />
						<Bar dataKey="salary" fill="#E76E50" name="Зарплаты" />
						<Legend />
					</BarChart>
				</ResponsiveContainer>
			</CardContent>
		</Card>
	);
};

export default ExpenseYear;
