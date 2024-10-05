import { FC } from "react";
import Chart1 from "./charts/Chart1";

interface WarehouseStatsProps {
	className?: string;
}

const WarehouseStats: FC<WarehouseStatsProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Chart1 />
		</div>
	);
};

export default WarehouseStats;
