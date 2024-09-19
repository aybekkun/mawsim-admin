import { FC } from "react";
import OrderPayListItem from "./OrderPayListItem";

interface OrderPayListProps {
	className?: string;
}

const OrderPayList: FC<OrderPayListProps> = ({ className = `` }) => {
	return (
		<div className={"grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 "+className}>
			<OrderPayListItem />
			<OrderPayListItem />
			<OrderPayListItem />
			<OrderPayListItem />
		</div>
	);
};

export default OrderPayList;
