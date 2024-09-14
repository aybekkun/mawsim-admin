import { FC } from "react";
import cn from "classnames";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "../AcceptOrder.module.scss";
import { useMenuStore } from "@/store/useMenuStore";
import { Button } from "@/components/ui/button";
import TableSelector from "./TableSelector";
import { Trash } from "lucide-react";
import MiniOrderList from "@/components/shared/miniorderlist/MiniOrderList";
interface OrderListProps {
	className?: string;
}

const OrderList: FC<OrderListProps> = ({ className = `` }) => {
	const { orders, setClear } = useMenuStore();
	const filteredOrders = orders.filter((order) => order.quantity > 0);
	const totalAllPrice = orders.reduce((acc, order) => acc + order.quantity * order.price, 0);
	return (
		<Card className={cn(styles.orderlist, className)}>
			<CardHeader>
				<CardTitle>Заказ</CardTitle>
			</CardHeader>
			<CardContent>
				<MiniOrderList orders={filteredOrders} totalAllPrice={totalAllPrice} />
				<div className="flex gap-2 items-center mt-2">
					<TableSelector />
					<Button disabled={filteredOrders.length === 0}>Заказать</Button>
					<Button onClick={setClear} variant="destructive" size={"sm"} className="ml-auto">
						<Trash />{" "}
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default OrderList;
