import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";
import { TOrder } from "@/services/waiter/menu/menu.types";
import { Button } from "@/components/ui/button";
import { ClipboardList, Trash2 } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface ClosedOrderItemProps {
	className?: string;
	order: TOrder;
}

const ClosedOrderItem: FC<ClosedOrderItemProps> = ({ order, className = `` }) => {
	return (
		<Card className={"flex justify-between items-center " + className}>
			<CardHeader className="p-2">
				<CardTitle>№ {order.id}</CardTitle>
				<div>
					<h3>{order.cafe_table.name}</h3>
				</div>
			</CardHeader>
			<CardContent className="flex gap-2 p-0 pr-4 items-center">
				<div className="space-x-2">
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
							<ClosedOrderList price={order.price} foods={order.foods} />
						</DialogContent>
					</Dialog>
					<Button variant={"destructive"} size={"icon"}>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

const ClosedOrderList = ({ foods, price }: { foods: TOrder["foods"]; price: string }) => {
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

export default ClosedOrderItem;
