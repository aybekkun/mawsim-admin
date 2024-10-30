import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";
import { ClipboardList, X } from "lucide-react";
import { TOrder } from "@/services/waiter/menu/menu.types";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useUpdateOrderStatusMutation } from "@/services/waiter/menu/menu.api";
interface OrderListItemProps {
	order: TOrder;
	className?: string;
}

const OrderListItem: FC<OrderListItemProps> = ({ order, className = `` }) => {
	const { mutate: updateStatus } = useUpdateOrderStatusMutation();
	const quantity = order.foods.reduce((acc, food) => acc + Number(food.quantity), 0);
	const onCloseOrder = async () => {
		if (window.confirm("Вы действительно хотите закрыть заказ?")) await updateStatus({ id: order.id, status_id: 2 });
	};
	const onCancelOrder = async () => {
		if (window.confirm("Вы действительно хотите отменить заказ?")) await updateStatus({ id: order.id, status_id: 3 });
	};
	return (
		<Card className={" " + className}>
			<CardHeader className="flex flex-row items-center justify-between pb-2">
				<CardTitle>{order.cafe_table.name}</CardTitle>
				<Badge>{order.status.name}</Badge>
			</CardHeader>
			<CardContent className="pb-0">
				<div className="text-sm font-bold">№{order.id} заказ</div>
				<p className="text-xs text-muted-foreground">{quantity} штук</p>
				{/* 	<div className="flex items-center mt-2 text-sm text-muted-foreground">
					<Clock className="h-4 w-4 mr-1" />
					Jun 10, 12:30 PM
				</div> */}
			</CardContent>
			<CardFooter className="flex justify-between gap-1 flex-wrap pt-2">
				<Dialog>
					<DialogTrigger asChild>
						<Button size={"icon"}>
							<ClipboardList className="h-4 w-4" />
						</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Список заказов</DialogTitle>
							<DialogDescription></DialogDescription>
						</DialogHeader>
						<OrderList price={order.price} foods={order.foods} />
					</DialogContent>
				</Dialog>
				<div className="flex gap-2">
					<Button onClick={onCancelOrder} size={"sm"}>Отменить</Button>
					<Button onClick={onCloseOrder} variant={"destructive"} size={"sm"}>
						<X /> Закрыть
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export const OrderList = ({ foods, price }: { foods: TOrder["foods"]; price: string }) => {
	return (
		<table>
			<thead>
				<tr className="border-b">
					<th className="text-left">№</th>
					<th className="text-left">Название</th>
					<th className="text-center w-[70px]">Количество</th>
				</tr>
			</thead>
			<tbody>
				{foods.map((item, index) => (
					<tr key={item.id} className="border-b">
						<td className="text-left">{index + 1}</td>
						<td>{item.name}</td>
						<td className="text-center w-[70px]">{Number(item.quantity)}</td>
					</tr>
				))}

				<tr>
					<td colSpan={1}></td>
					<td className="text-right" colSpan={3}>
						<b>Итого: {Number(price).toLocaleString("ru-Ru")} сум</b>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

export default OrderListItem;
