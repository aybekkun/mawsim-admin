import { FC } from "react";

interface FinanceProps {
	className?: string;
}

const Finance: FC<FinanceProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<h2 className="text-xl font-bold text-slate-800">Расходы</h2>
		</div>
	);
};

export default Finance;
