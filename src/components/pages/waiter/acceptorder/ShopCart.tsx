import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Waypoints, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import { useBasketStore } from "@/store/useBasketStore";
import { useGetAllWaiterTableQuery } from "@/services/waiter/menu/menu.api";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
interface ShopCartProps {
	className?: string;
}

const ShopCart: FC<ShopCartProps> = () => {
	const [open, setOpen] = useState(false);
	const [tableId, setTableId] = useState(0);
	const { items, clearBasket } = useBasketStore();
	const quantity = items?.reduce((acc, item) => acc + item.quantity, 0);
	const badge = quantity != 0 && <Badge className="ml-1">{quantity}</Badge>;
	const onClear = () => {
		clearBasket();
		setOpen(false);
		setTableId(0);
	};

	return (
		<>
			<Button onClick={() => setOpen(true)} className="bg-orange-500 hover:bg-orange-200">
				<ShoppingCart /> Корзина
				{badge}
			</Button>
			<MyDialog title="Корзина" open={open} onOpenChange={(open) => setOpen(open)}>
				<TableList defaultValue={String(tableId)} setTableId={setTableId} />
				{items.length > 0 ? <OrderList /> : <h2 className="font-bold text-lg">Добавьте в корзину что-нибудь</h2>}

				<div className="flex justify-between">
					<Button onClick={onClear} variant={"destructive"}>
						Очистить
					</Button>
					<Button disabled={items.length == 0 && tableId == 0}>Заказать</Button>
				</div>
			</MyDialog>
		</>
	);
};

const OrderList = () => {
	const { items, removeItem, totalPrice } = useBasketStore();
	const price = totalPrice.toLocaleString("ru-Ru");
	const total = (totalPrice + totalPrice * 0.1).toLocaleString("ru-Ru");
	return (
		<table>
			<thead>
				<tr className="border-b">
					<th className="text-left">№</th>
					<th className="text-left">Название</th>
					<th className="text-center w-[70px]">Количество</th>
					<th className="text-right">Цена</th>
					<th>
						<Waypoints className="w-5 h-5" />
					</th>
				</tr>
			</thead>
			<tbody>
				{items.map((item, index) => (
					<tr key={item.id} className="border-b">
						<td className="text-left">{index + 1}</td>
						<td>{item.food.name}</td>
						<td className="text-center w-[70px]">{item.quantity}</td>
						<td className="text-right">{(Number(item.quantity) * Number(item.price)).toLocaleString("ru-Ru")}</td>
						<td className="flex justify-center items-center">
							<Button onClick={() => removeItem(item.id)} variant="destructive" size={`icon`} className="w-5 h-5">
								<X />
							</Button>
						</td>
					</tr>
				))}

				<tr>
					<td colSpan={1}></td>
					<td className="text-right" colSpan={3}>
						<b>
							Итого: {price} + 10% = {total}
						</b>
					</td>
				</tr>
			</tbody>
		</table>
	);
};

const TableList = ({
	defaultValue = "0",
	setTableId = () => {},
}: {
	defaultValue: string;
	setTableId: (id: number) => void;
}) => {
	const { data } = useGetAllWaiterTableQuery({});
	const sortedData = data?.data.sort((a, b) => a.id - b.id);
	return (
		<Select
			defaultValue={defaultValue !== "0" ? defaultValue : undefined}
			onValueChange={(val) => setTableId(Number(val))}
		>
			<SelectTrigger className="w-full">
				<SelectValue placeholder="Выберите стол" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Столы</SelectLabel>
					{sortedData?.map((table) => (
						<SelectItem key={table.id} value={String(table.id)}>
							{table.name}
						</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
};
export default ShopCart;
