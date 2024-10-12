import SelectFromToDate from "@/components/shared/SelectDate/SelectFromToDate";
import { Card, CardContent } from "@/components/ui/card";
import { Coins } from "lucide-react";
import { FC } from "react";

interface ProfitProps {
	className?: string;
}

const Profit: FC<ProfitProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<h2 className="text-3xl font-bold tracking-tight mb-4">Прибыль</h2>
			<Card>
				<CardContent className="flex items-center justify-between pt-5 gap-4 flex-wrap-reverse">
					<div className="text-2xl gap-4 flex items-center font-bold text-nowrap">
          <Coins />
						120 000 000 сум
					</div>{" "}
					<SelectFromToDate />
				</CardContent>
			</Card>
		</div>
	);
};

export default Profit;
