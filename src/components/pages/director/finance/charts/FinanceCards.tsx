import { FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, ShoppingBag, Utensils, WalletIcon } from "lucide-react";
import MyDateSelect from "@/components/shared/MyDateSelect/MyDateSelect";
interface FinanceCardsProps {
	className?: string;
}

const FinanceCards: FC<FinanceCardsProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<div className="mb-4 flex justify-between gap-4 flex-wrap">
				<h2 className="text-3xl font-bold tracking-tight">Финансы</h2>
				<MyDateSelect />
			</div>

			<div className="grid gap-4 xl:grid-cols-4  md:grid-cols-2">
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Общий доход</CardTitle>
						<DollarSign className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">120 000 000</div>
						<p className="text-xs text-muted-foreground">+20.1% больше чем прошлом месяце</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Расходы</CardTitle>
						<WalletIcon className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">84 000 000</div>
						<p className="text-xs text-muted-foreground">+4.75% больше чем прошлом месяце</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Прибыль</CardTitle>
						<ShoppingBag className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">36 000 000</div>
						<p className="text-xs text-muted-foreground">+15.3% больше чем прошлом месяце</p>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-sm font-medium">Средняя цена заказа</CardTitle>
						<Utensils className="h-4 w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">42 000</div>
						<p className="text-xs text-muted-foreground">+2.4% больше чем прошлом месяце</p>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default FinanceCards;
