import { FC } from "react";

import { ChartPie, CookingPot, DollarSign, ShoppingCart } from "lucide-react";
import MyDateSelect from "@/components/shared/MyDateSelect/MyDateSelect";
import InfoCard from "@/components/shared/InfoCard/InfoCard";
interface FinanceCardsProps {
	className?: string;
}

const ExpenseCards: FC<FinanceCardsProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<div className="mb-4 flex justify-between gap-4 flex-wrap">
		
				<MyDateSelect />
			</div>

			<div className="grid gap-4  xl:grid-cols-4  md:grid-cols-2">
				<InfoCard title="Зарплаты" value="120 000 000" description="Зарплаты в этом месяце" Icon={DollarSign} />
				<InfoCard title="Товары" value="84 000 000" description="Расходы на покупку товаров" Icon={ShoppingCart} />
				<InfoCard title="Заготовка" value="20 000 000" description="Расходы на заготовку" Icon={CookingPot} />
				<InfoCard title="Другие" value="120 000 000" description="Прочие расходы" Icon={ChartPie} />
			</div>
		</div>
	);
};

export default ExpenseCards;
