import { FC, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectYearProps {
	className?: string;
	setSelectYear: (year: string) => void;
}

const SelectYear: FC<SelectYearProps> = ({ className = ``, setSelectYear = () => undefined }) => {
	const currentYear = new Date().getFullYear();
	const startYear = 2024;

	const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => (startYear + i).toString());

	const [year, setYear] = useState<string>(currentYear.toString());
	const onSelect = (year: string | undefined) => {
		if (year) {
			setYear(year);
			setSelectYear(year);
		}
	};
	return (
		<div className={"flex  items-center gap-2 " + className}>
			<Select value={year} onValueChange={onSelect}>
				<SelectTrigger className="w-[100px]">
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
};

export default SelectYear;
