import { FC,useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SelectYearProps {
	className?: string;
}

const SelectYear: FC<SelectYearProps> = ({ className = `` }) => {
	const [year, setYear] = useState<string>(new Date().getFullYear().toString());
	const years = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - 5 + i).toString());

	return (
		<div className={"flex  items-center gap-2 "+className}>
			<Select value={year} onValueChange={setYear}>
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
