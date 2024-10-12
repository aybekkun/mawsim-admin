import SelectMonthYear from "@/components/shared/SelectDate/SelectMonthYear";
import { FC } from "react";

const Salary: FC = () => {
	return (
		<div className="space-y-4">
			<div className="flex flex-wrap gap-4 justify-between">
				<h2 className="text-3xl font-bold tracking-tight">Зарплата</h2> <SelectMonthYear />
			</div>
			Здесь список зарплаты
		</div>
	);
};

export default Salary;
