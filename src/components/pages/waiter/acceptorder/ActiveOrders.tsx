import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	SelectContent,
	SelectGroup,
	SelectLabel,
	SelectTrigger,
	SelectValue,
	Select,
	SelectItem,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

import { useAddOrderMutation, useGetActiveOrderQuery } from "@/services/waiter/menu/menu.api";
import { TOrder } from "@/services/waiter/menu/menu.types";
import { TBasket, useBasketStore } from "@/store/useBasketStore";

import { ListOrdered, Waypoints, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

const ActiveOrders: FC = () => {
	const { mutate: addOrder, isPending: isAdding } = useAddOrderMutation();
	const [open, setOpen] = useState(false);
	const { data } = useGetActiveOrderQuery({ status_id: 1, limit: 1000 });
	const [activeOrderId, setActiveOrderId] = useState<number>(0);
	const [activeOrders, setActiveOrders] = useState<{ orderId: number; tableId: number; tableName: string }[]>([]);

	const { items, clearBasket } = useBasketStore();
	useEffect(() => {
		if (data?.data) {
			const activeOrders = data?.data.map((item) => {
				return {
					orderId: item.id,
					tableId: item.cafe_table.id,
					tableName: item.cafe_table.name,
				};
			});
			setActiveOrders(activeOrders);
		}
	}, [data?.data.length]);

	const onAddOrder = async () => {
		if (activeOrderId === 0) {
			toast({ title: "Выберите автивный заказ", description: "Выберите заказ", duration: 5000 });
			return;
		}
		if (items.length === 0) {
			toast({ title: "Выберите меню", description: "Выберите продукты", duration: 5000 });
			return;
		}
		const basket = items.map((item) => {
			return {
				food_id: item.id,
				quantity: item.quantity,
			};
		});
		await addOrder({ id: activeOrderId, foods: basket });
		clearBasket();
		setOpen(false);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<ListOrdered /> Активные заказы
				<Badge className="ml-1 bg-orange-500 hover:bg-orange-200">{data?.meta.total}</Badge>
			</Button>
			<MyDialog title="Корзина" open={open} onOpenChange={(open) => setOpen(open)}>
				<TableList
					defaultValue={String(activeOrderId)}
					activeOrders={activeOrders || []}
					onChangeValue={(id: number) => setActiveOrderId(id)}
				/>
				<OrderList foods={data?.data?.find((item) => item.id == activeOrderId)?.foods || []} />
				<NewOrderList foods={items || []} />
				<div className="flex justify-between">
					<Button disabled={isAdding} onClick={onAddOrder}>
						Заказать
					</Button>
				</div>
			</MyDialog>
		</>
	);
};
const TableList = ({
	activeOrders = [],
	defaultValue = "0",
	onChangeValue = () => {},
}: {
	activeOrders: {
		orderId: number;
		tableId: number;
		tableName: string;
	}[];
	defaultValue: string;
	onChangeValue?: (value: number) => void;
}) => {
	return (
		<Select defaultValue={defaultValue ? defaultValue : undefined} onValueChange={(val) => onChangeValue(Number(val))}>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Выберите стол" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Столы</SelectLabel>
					{activeOrders?.map((order) => (
						<SelectItem key={order.orderId} value={String(order.orderId)}>
							№{order.orderId} заказ {order.tableName}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};

const OrderList = ({ foods }: { foods: TOrder["foods"] }) => {
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
					<tr key={item.id + index} className="border-b">
						<td className="text-left">{index + 1}</td>
						<td>{item.name}</td>
						<td className="text-center w-[70px]">{Number(item.quantity)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
const NewOrderList = ({ foods }: { foods: TBasket["items"] }) => {
	const { removeItem } = useBasketStore();
	return (
		<table>
			<thead>
				<tr className="border-b">
					<th className="text-center" colSpan={3}>
						<h2>Новые заказы</h2>
					</th>
					<th>
						<Waypoints className="w-5 h-5" />
					</th>
				</tr>
			</thead>
			<tbody>
				{foods.map((item, index) => (
					<tr key={item.id + index} className="border-b">
						<td className="text-left">{index + 1}</td>
						<td>{item.food.name}</td>
						<td className="text-center w-[70px]">{Number(item.quantity)}</td>
						<td className="flex justify-center items-center">
							<Button onClick={() => removeItem(item.id)} variant="destructive" size={`icon`} className="w-5 h-5">
								<X />
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default ActiveOrders;
