import { FC } from "react";

interface FinanceProps {
	className?: string;
}

const Finance: FC<FinanceProps> = ({ className = `` }) => {
	return <div className={className}>Finance</div>;
};

export default Finance;
