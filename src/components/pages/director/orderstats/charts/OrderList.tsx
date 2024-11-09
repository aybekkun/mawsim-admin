import { useGetAllOrderQuery } from "@/services/director/director.api";
import { FC, useEffect, useState } from "react";
import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import OrderBadgeStatus from "@/components/shared/OrderBadge/OrderBadgeStatus";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { TOrder } from "@/services/waiter/menu/menu.types";
import { groupAndCalculate, GroupedItem } from "@/utils/groupAndCalculate";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import OrderBadgeTakeaway from "@/components/shared/OrderBadge/OrderBadgeTakeaway";
import { SelectDate } from "@/components/shared/SelectDate/SelectDate";
import { useDateRange } from "@/hooks/useDateRange.hook";

const columns: TColumns<TOrder>[] = [
	{
		title: "Номер заказа",
		dataIndex: "id",
		render: (_, record) => <div className="whitespace-nowrap">№ {record.id}</div>,
	},
	{
		title: "Сумма",
		dataIndex: "price",
		render: (value) => <div className="whitespace-nowrap">{Number(value).toLocaleString("ru-Ru")}</div>,
	},
	{
		title: "Статус",
		render: (_, record) => <OrderBadgeStatus id={record.status.id} />,
	},
	{
		title: "Тип",
		render: (_, record) => <OrderBadgeTakeaway is_takeaway={record.is_takeaway} />,
	},
	{
		title: "Заказы",
		render: (_, record) => (
			<OrderListDetail
				status_id={record.status.id}
				foods={record.foods}
				price={record.price}
				is_takeaway={record.is_takeaway}
			/>
		),
	},
];
interface OrderListProps {
	className?: string;
}

const OrderList: FC<OrderListProps> = ({ className = `` }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { date, updateFromDate, updateToDate } = useDateRange();
	const { data, isLoading } = useGetAllOrderQuery({
		from: date.from,
		to: date.to,
		page: currentPage,
		limit: 10,
	});
	return (
		<>
			<div className="flex gap-4 flex-wrap">
				<SelectDate title="от" month={-1} setCurrentPage={setCurrentPage} selectDate={updateFromDate} />
				<SelectDate title="до" month={0} setCurrentPage={setCurrentPage} selectDate={updateToDate} />
			</div>
			<Card className={className}>
				<CardHeader>
					<CardTitle>Количество заказов: {data?.meta?.total}</CardTitle>
				</CardHeader>
				<CardContent>
					<MyTable source={data?.data || []} columns={columns} loading={isLoading} currentPage={currentPage} />
				</CardContent>
			</Card>
			<MyPagination
				className="mt-2"
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPosts={data?.meta?.total || 1}
				postsPerPage={10}
			/>
		</>
	);
};

const OrderListDetail = ({
	foods,
	price,

	is_takeaway = false,
}: {
	foods: TOrder["foods"];
	price: string;
	status_id: number;
	is_takeaway: boolean;
}) => {
	const [items, setItems] = useState<GroupedItem[]>([]);
	useEffect(() => {
		const resultItems = groupAndCalculate(foods);
		setItems(resultItems);
	}, [foods]);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"icon"}>
					<ClipboardList className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Список заказов</DialogTitle>
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
						{items.map((item, index) => (
							<tr key={index} className="border-b">
								<td className="text-left">{index + 1}</td>
								<td>{item.name}</td>
								<td className="text-center w-[70px]">
									<div className="flex items-center gap-2">{Number(item.quantity)}</div>
								</td>
								<td className="text-right">{Number(item.totalPrice).toLocaleString("ru-Ru")}</td>
							</tr>
						))}

						<tr>
							<td colSpan={1}></td>
							<td className="text-right" colSpan={3}>
								<b>
									Итого {is_takeaway ? "" : "+10%"}: {Number(price).toLocaleString("ru-Ru")}
									сум
								</b>
							</td>
						</tr>
					</tbody>
				</table>
			</DialogContent>
		</Dialog>
	);
};
export default OrderList;
