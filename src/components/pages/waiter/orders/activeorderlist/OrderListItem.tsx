import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FC, useEffect, useState } from "react";
import { ClipboardList, Minus, Plus, X } from "lucide-react";
import { TOrder } from "@/services/waiter/menu/menu.types";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { useUpdateOrderMutation, useUpdateOrderStatusMutation } from "@/services/waiter/menu/menu.api";
import { groupAndCalculate, GroupedItem } from "@/utils/groupAndCalculate";
import { toast } from "@/hooks/use-toast";

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
				<div className="gap-2 flex">
					<Badge>{order.status.name}</Badge>
					{order.is_takeaway ? <Badge className="bg-slate-900">Собой</Badge> : null}
				</div>
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
						<OrderList
							orderId={order.id}
							status_id={order.status.id}
							cafe_table_id={order.cafe_table.id}
							price={order.price}
							is_takeaway={order.is_takeaway}
							foods={order.foods}
						/>
					</DialogContent>
				</Dialog>
				<div className="flex gap-2">
					<Button onClick={onCancelOrder} size={"sm"}>
						Отменить
					</Button>
					<Button onClick={onCloseOrder} variant={"destructive"} size={"sm"}>
						<X /> Закрыть
					</Button>
				</div>
			</CardFooter>
		</Card>
	);
};

export const OrderList = ({
	orderId,
	foods,
	price,
	cafe_table_id,
	status_id,
	is_takeaway = false,
}: {
	orderId: number;
	foods: TOrder["foods"];
	price: string;
	status_id: number;
	cafe_table_id: number;
	is_takeaway: boolean;
}) => {
	const [items, setItems] = useState<GroupedItem[]>([]);
	const { mutate: updateOrder } = useUpdateOrderMutation();
	useEffect(() => {
		const resultItems = groupAndCalculate(foods);
		setItems(resultItems);
	}, [foods]);

	const onPlus = (id: number) => {
		const newItems = items.map((item) => {
			if (item.id === id) {
				item.quantity = Number(item.quantity) + 1;
				item.totalPrice = Number(item.quantity) * Number(item.price);
			}
			return item;
		});

		setItems(newItems);
	};

	const onMinus = (id: number) => {
		if (items.length === 1 && items[0].quantity == 1) {
			toast({
				title: "Нельзя",
				description: "нельзя польностью изменить все заказы",
				variant: "destructive",
				duration: 1500,
			});
		}
		const newItems = items
			.map((item) => {
				if (item.id === id) {
					const qunantity = (item.quantity = Number(item.quantity) - 1);

					if (qunantity > 0) {
						item.totalPrice = Number(qunantity) * Number(item.price);
					}
				}
				return item;
			})
			.filter((item, idx, arr) => {
				if (arr.length === 1 && item.id === id) {
					item.quantity = Math.max(item.quantity, 1);
				}
				return item.quantity > 0 || arr.length === 1;
			});

		setItems(newItems);
	};

	const onUpdate = async () => {
		if (window.confirm("Вы действительно хотите изменить заказ?")) {
			await updateOrder({
				id: orderId,
				status_id,
				is_takeaway: is_takeaway,
				cafe_table_id,
				foods: items.map((item) => {
					return {
						food_id: item.id,
						quantity: item.quantity,
					};
				}),
			});
		}
	};
	return (
		<>
			<table>
				<thead>
					<tr className="border-b">
						<th className="text-left">№</th>
						<th className="text-left">Название</th>
						<th className="text-center w-[70px]">Количество</th>
						<th className="text-right">Цена</th>
					</tr>
				</thead>
				<tbody>
					{items.map((item, index) => (
						<tr key={index} className="border-b">
							<td className="text-left">{index + 1}</td>
							<td>{item.name}</td>
							<td className="text-center w-[70px]">
								<div className="flex items-center gap-2">
									<Button onClick={() => onMinus(item.id)} className="w-5 h-5" size={"icon"}>
										<Minus />
									</Button>
									{Number(item.quantity)}
									<Button onClick={() => onPlus(item.id)} className="w-5 h-5" size={"icon"}>
										<Plus />
									</Button>
								</div>
							</td>
							<td className="text-right">{Number(item.totalPrice).toLocaleString("ru-Ru")}</td>
						</tr>
					))}

					<tr>
						<td colSpan={1}></td>
						<td className="text-right" colSpan={3}>
							<b>
								Итого: {Number(price).toLocaleString("ru-Ru")}
								сум
							</b>
						</td>
					</tr>
				</tbody>
			</table>
			<div>
				<Button onClick={onUpdate}>Изменить</Button>
			</div>
		</>
	);
};

export default OrderListItem;
