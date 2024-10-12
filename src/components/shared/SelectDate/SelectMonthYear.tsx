import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SelectMonthYear() {
	const [year, setYear] = React.useState<string>(new Date().getFullYear().toString());
	const [month, setMonth] = React.useState<string>((new Date().getMonth() + 1).toString().padStart(2, "0"));
	const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
	const months = [
		{ value: "01", label: "Янв" },
		{ value: "02", label: "Фев" },
		{ value: "03", label: "Мар" },
		{ value: "04", label: "Апр" },
		{ value: "05", label: "Май" },
		{ value: "06", label: "Июн" },
		{ value: "07", label: "Июл" },
		{ value: "08", label: "Авг" },
		{ value: "09", label: "Сен" },
		{ value: "10", label: "Окт" },
		{ value: "11", label: "Ноя" },
		{ value: "12", label: "Дек" },
	];
	return (
		<div className="flex  items-center gap-2">
			<Select value={month} onValueChange={setMonth}>
				<SelectTrigger className="w-[140px]">
					<SelectValue placeholder="Select month" />
				</SelectTrigger>
				<SelectContent>
					{months.map((m) => (
						<SelectItem key={m.value} value={m.value}>
							{m.label}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
			<Select value={year} onValueChange={setYear}>
				<SelectTrigger className="w-[140px]">
					<SelectValue placeholder="Выберите год" />
				</SelectTrigger>
				<SelectContent>
					{years.map((y) => (
						<SelectItem key={y} value={y}>
							{y}
						</SelectItem>
					))}
				</SelectContent>
			</Select>
		</div>
	);
}
