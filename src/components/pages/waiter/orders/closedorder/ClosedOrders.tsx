import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Card, CardContent } from "@/components/ui/card";
import { useDeleteOrderMutation, useGetAllOrderQuery } from "@/services/waiter/menu/menu.api";
import { TOrder } from "@/services/waiter/menu/menu.types";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { FC, useState } from "react";

import { ClipboardList, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { groupAndCalculate } from "@/utils/groupAndCalculate";

const columns: TColumns<TOrder>[] = [
	{
		title: "Номер заказа",
		render: (_, record) => <>№ {record.id}</>,
	},
	{
		title: "Номер стола",
		render: (_, record) => <>{record.cafe_table.name}</>,
	},
	{
		title: "Тип",
		render: (_, record) => <>{record.is_takeaway ? "Собой" : "Заказ"}</>,
	},
	{
		title: "Статус",
		render: (_, record) => <>{record.status.name}</>,
	},
	{
		title: "Список заказов",
		render: (_, record) => <ClosedOrderList foods={record.foods} price={record.price} />,
	},
	{
		title: "Удалить",
		render: (_, record) => <DeleteOrder id={record.id} />,
	},
];

const ClosedOrders: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, isFetching } = useGetAllOrderQuery({ status_id: 2, page: currentPage, limit: 10 });
	return (
		<div className={"space-y-4"}>
			<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Закрытые заказы: {data?.meta.total}</h2>
			<Card>
				<CardContent>
					<MyTable
						fetching={isFetching}
						currentPage={currentPage}
						loading={isLoading}
						source={data?.data || []}
						columns={columns}
					/>
				</CardContent>
			</Card>
			<MyPagination
				className={"mt-4"}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
			/>
		</div>
	);
};
const ClosedOrderList = ({ foods, price }: { foods: TOrder["foods"]; price: string }) => {
	const resultItems = groupAndCalculate(foods);
	return (
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
						{resultItems.map((item, index) => (
							<tr key={item.id} className="border-b">
								<td className="text-left">{index + 1}</td>
								<td>{item.name}</td>
								<td className="text-center w-[70px]">{Number(item.quantity)}</td>
								<td className="text-right">{Number(item.totalPrice).toLocaleString("ru-Ru")}</td>
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
			</DialogContent>
		</Dialog>
	);
};

const DeleteOrder = ({ id }: { id: number }) => {
	const { mutate: deleteOrder } = useDeleteOrderMutation();

	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить заказ?")) await deleteOrder(id);
	};

	return (
		<Button onClick={onDelete} variant={"destructive"} size={"icon"}>
			<Trash2 className="w-4 h-4" />
		</Button>
	);
};
export default ClosedOrders;
