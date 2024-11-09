import { FC } from "react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import OrderList from "./charts/OrderList";

const OrderStats: FC = () => {
	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 gap-4 justify-center md:grid-cols-3"></div>
			<Chart1 />

			<OrderList />
		</div>
	);
};

export default OrderStats;
