import { FC } from "react";
import OrderListItem from "./OrderListItem";



const ActiveOrderList: FC = () => {
	return (
		<div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
			<OrderListItem />
			<OrderListItem />
			<OrderListItem />
			<OrderListItem />
			<OrderListItem />
		</div>
	);
};

export default ActiveOrderList;
