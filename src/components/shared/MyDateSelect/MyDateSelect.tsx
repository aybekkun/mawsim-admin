import * as React from "react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function MyDateSelect() {
	const [year, setYear] = React.useState<string>(new Date().getFullYear().toString());
	const [month, setMonth] = React.useState<string>((new Date().getMonth() + 1).toString().padStart(2, "0"));
	const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());
	const months = [
		{ value: "01", label: "Январь" },
		{ value: "02", label: "Февраль" },
		{ value: "03", label: "Март" },
		{ value: "04", label: "Апрель" },
		{ value: "05", label: "Май" },
		{ value: "06", label: "Июнь" },
		{ value: "07", label: "Июль" },
		{ value: "08", label: "Август" },
		{ value: "09", label: "Сентябрь" },
		{ value: "10", label: "Октябрь" },
		{ value: "11", label: "Ноябрь" },
		{ value: "12", label: "Декабрь" },
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
