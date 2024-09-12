import { FC } from "react";
import cn from "classnames";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "../AcceptOrder.module.scss";
import { useMenuStore } from "@/store/useMenuStore";
import { Button } from "@/components/ui/button";
import TableSelector from "./TableSelector";
interface OrderListProps {
	className?: string;
}

const OrderList: FC<OrderListProps> = ({ className = `` }) => {
	const orders = useMenuStore((statе) => statе.orders);
	const filteredOrders = orders.filter((order) => order.quantity > 0);
	const totalAllPrice = orders.reduce((acc, order) => acc + order.quantity * order.price, 0);
	return (
		<Card className={cn(styles.orderlist, className)}>
			<CardHeader>
				<CardTitle>Заказ</CardTitle>
			</CardHeader>
			<CardContent>
				<table className="w-full">
					<thead>
						<tr className="border-y border-dashed">
							<th className="text-left">Имя</th>
							<th className="text-center">Количество</th>
							<th className="text-right">Цена</th>
						</tr>
					</thead>
					<tbody>
						{filteredOrders.map((order) => (
							<OrderListItem key={order.id} {...order} />
						))}
					</tbody>
				</table>
				<div>
					<p className="text-xs flex justify-between">
						<b>Общая сумма:</b> <span>{totalAllPrice}</span>
					</p>
				</div>
				<div className="flex gap-2 items-center mt-2">
					<TableSelector />
					<Button disabled={filteredOrders.length === 0} size={"sm"} >
						Заказать
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};
type OrderListItemProps = {
	name: string;
	quantity: number;
	totalPrice: number;
};

const OrderListItem: FC<OrderListItemProps> = ({ name, quantity, totalPrice }) => {
	return (
		<tr className="border-y border-dashed">
			<td>{name}</td>
			<td className="text-center">{quantity}</td>
			<td className="text-right">{totalPrice}</td>
		</tr>
	);
};
export default OrderList;
