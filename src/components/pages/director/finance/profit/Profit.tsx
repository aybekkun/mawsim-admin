import InfoCard from "@/components/shared/InfoCard/InfoCard";
import SelectFromToDate from "@/components/shared/SelectDate/SelectFromToDate";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useGetProfitQuery } from "@/services/director/director.api";
import { addMonths, format } from "date-fns";
import { Coins } from "lucide-react";
import { FC, useState } from "react";

interface ProfitProps {
	className?: string;
}

const Profit: FC<ProfitProps> = ({ className = `` }) => {
	const [date, setDate] = useState({
		from: format(addMonths(new Date(), -1), "yyyy-MM-dd"),
		to: format(addMonths(new Date(), 0), "yyyy-MM-dd"),
	});
	const { data } = useGetProfitQuery({ from: date.from, to: date.to });

	return (
		<div className={"space-y-4"}>
		{/* 	<div className="flex gap-4 flex-wrap">
				<InfoCard
					title="Расход на товары"
					value={Number(data?.data.expenses_food).toLocaleString("ru-Ru")}
					description="Готовые товары"
				/>
				<InfoCard
					title="Расход на сырье"
					value={Number(data?.data.expenses_product).toLocaleString("ru-Ru")}
					description="Сырье (Картошка, лук)"
				/>
				<InfoCard
					title="Другие расходы"
					value={Number(data?.data.other_expenses).toLocaleString("ru-Ru")}
					description="Другие расходы"
				/>
				<InfoCard
					title="Зарплаты"
					value={Number(data?.data.salaries).toLocaleString("ru-Ru")}
					description="Расходы на сотрудников"
				/>
				<InfoCard
					title="Заказы"
					value={Number(data?.data.orders).toLocaleString("ru-Ru")}
					description="Общие количество заказов"
				/>
			</div> */}
			<Card>
				<CardHeader className="pb-0">
					<h2 className="text-3xl font-bold tracking-tight">Баланс</h2>
				</CardHeader>
				<CardContent className="flex items-center justify-between pt-5 gap-4 flex-wrap-reverse">
					<div className="text-2xl gap-4 flex items-center font-bold text-nowrap">
						<Coins />
						{Number(data?.data.gross_profit).toLocaleString("ru-Ru")}
					</div>
					<SelectFromToDate selectDate={setDate} />
				</CardContent>
			</Card>
		</div>
	);
};

export default Profit;
