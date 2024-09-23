import { FC } from "react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";

const OrderStats: FC = () => {
	return (
		<div>
			<Chart1 />
			<div>
				<Chart2 />
				<Chart2 />
				<Chart2 />
			</div>
		</div>
	);
};

export default OrderStats;
