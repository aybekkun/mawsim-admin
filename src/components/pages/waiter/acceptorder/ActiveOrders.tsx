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

import { useGetActiveOrderQuery } from "@/services/waiter/menu/menu.api";
import { TOrder } from "@/services/waiter/menu/menu.types";

import { ListOrdered, Waypoints, X } from "lucide-react";
import { FC, useEffect, useState } from "react";

const ActiveOrders: FC = () => {
	const [open, setOpen] = useState(false);
	const { data } = useGetActiveOrderQuery({ status_id: 1 });
	const [activeOrderId, setActiveOrderId] = useState<number>(0);
	const [activeOrders, setActiveOrders] = useState<{ orderId: number; tableId: number; tableName: string }[]>([]);

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

	return (
		<>
			<Button onClick={() => setOpen(true)}>
				<ListOrdered /> Активные заказы
				<Badge className="ml-1 bg-orange-500 hover:bg-orange-200">{data?.meta.total}</Badge>
			</Button>
			<MyDialog title="Корзина" open={open} onOpenChange={(open) => setOpen(open)}>
				<TableList activeOrders={activeOrders || []} onChangeValue={(id: number) => setActiveOrderId(id)} />
				<OrderList foods={data?.data?.find((item) => item.id == activeOrderId)?.foods || []} />
				<div className="flex justify-between">
					<Button>Очистить</Button>
					<Button>Заказать</Button>
				</div>
			</MyDialog>
		</>
	);
};
const TableList = ({
	activeOrders = [],
	onChangeValue = () => {},
}: {
	activeOrders: {
		orderId: number;
		tableId: number;
		tableName: string;
	}[];
	onChangeValue?: (value: number) => void;
}) => {
	return (
		<Select onValueChange={(val) => onChangeValue(Number(val))}>
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
					<tr key={item.id} className="border-b">
						<td className="text-left">{index + 1}</td>
						<td>{item.name}</td>
						<td className="text-center w-[70px]">{Number(item.quantity)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};
const ActiveOrderList: FC = () => {
	return <></>;
};

export default ActiveOrders;
