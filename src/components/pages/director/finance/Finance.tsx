import { FC } from "react";
import AnnualProfit from "./charts/AnnualProfit";

import FinanceCards from "./charts/FinanceCards";
import RevenueExpenseProfit from "./charts/RevenueExpenseProfit";
import RecentTransactions from "./charts/RecentTransactions";
import WeeklyProfit from "./charts/WeeklyProfit";

const Finance: FC = () => {
	return (
		<div className={"grid gap-4"}>
	
			<FinanceCards />
			<WeeklyProfit />
			<RecentTransactions />
			<div className="grid gap-4 grid-cols-1 xl:grid-cols-9">
				<AnnualProfit className="xl:col-span-5" />
				<RevenueExpenseProfit className="xl:col-span-4" />
			</div>
		</div>
	);
};

export default Finance;
