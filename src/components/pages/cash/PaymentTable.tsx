import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import OrderBadgeStatus from "@/components/shared/OrderBadge/OrderBadgeStatus";
import logoSvg from "@/assets/logoBlack.svg";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useReactToPrint } from "react-to-print";
import { useGetActiveOrderQuery, useUpdateOrderStatusMutation } from "@/services/waiter/menu/menu.api";
import { TOrder } from "@/services/waiter/menu/menu.types";
import { groupAndCalculate, GroupedItem } from "@/utils/groupAndCalculate";

import { FC, useEffect, useRef, useState } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClipboardList, ReceiptText } from "lucide-react";
import OrderBadgeTakeaway from "@/components/shared/OrderBadge/OrderBadgeTakeaway";
interface PaymentTableProps {
	className?: string;
	status_id: number;
}

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
			<OrderList
				status_id={record.status.id}
				foods={record.foods}
				price={record.price}
				is_takeaway={record.is_takeaway}
			/>
		),
	},
	{
		title: "Чек",
		render: (_, record) => (
			<Pay
				orderId={record.id}
				status_id={record.status.id}
				foods={record.foods}
				price={record.price}
				is_takeaway={record.is_takeaway}
			/>
		),
	},
];
const PaymentTable: FC<PaymentTableProps> = ({ status_id, className = `` }) => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetActiveOrderQuery({
		status_id: status_id ? status_id : undefined,
		page: currentPage,
		limit: 10,
	});

	return (
		<>
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

const Pay = ({
	orderId,
	foods,
	price,
	status_id,
	is_takeaway = false,
}: {
	orderId: number;
	foods: TOrder["foods"];
	price: string;
	status_id: number;
	is_takeaway: boolean;
}) => {
	const { mutate: updateOrder, isSuccess } = useUpdateOrderStatusMutation();
	const [items, setItems] = useState<GroupedItem[]>([]);
	const contentRef = useRef<HTMLDivElement>(null);
	const reactToPrintFn = useReactToPrint({ contentRef });
	useEffect(() => {
		const resultItems = groupAndCalculate(foods);
		setItems(resultItems);
	}, [foods]);

	useEffect(() => {
		if (isSuccess) {
			reactToPrintFn();
		}
	}, [isSuccess]);

	const onPrint = async () => {
		if (status_id === 1) {
			if (window.confirm("Закрыть заказ?")) {
				await updateOrder({ id: orderId, status_id: 2 });
			}
			return;
		}
		if (status_id === 2) {
			await reactToPrintFn();
			return;
		}
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size={"icon"}>
					<ReceiptText className="h-4 w-4" />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Список заказов</DialogTitle>
				</DialogHeader>

				<table className="w-full">
					<thead>
						<tr className="border-b p-4">
							<th className="text-left">№</th>
							<th className="text-left">Название</th>
							<th className="text-center w-[70px]">Количество</th>
							<th className="text-right">Цена</th>
						</tr>
					</thead>
					<tbody className="p-4">
						{items.map((item, index) => (
							<tr key={index} className="border-b">
								<td className="text-left">{index + 1 + "."}</td>
								<td>{item.name}</td>
								<td className="text-center w-[70px]">
									<div className="flex items-center justify-center gap-2">{Number(item.quantity)}</div>
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

				<div>
					<Button onClick={onPrint}>
						<ReceiptText className="h-4 w-4 mr-2" /> Чек
					</Button>
				</div>
				<div style={{ display: "none" }}>
					<div className="print" ref={contentRef}>
						<div className="flex gap-2 items-center">
							<img src={logoSvg} className="w-8 h-8" />
							<h2 className="font-bold"> Mausim Kafe</h2>
						</div>
						<table>
							<thead>
								<tr className="border-b">
									<th className="text-left">№</th>
									<th className="text-left">Название</th>
									<th className="text-center  whitespace-nowrap">Количество</th>
									<th className="text-right">Цена</th>
								</tr>
							</thead>
							<tbody>
								{items.map((item, index) => (
									<tr key={index} className="border-b">
										<td className="text-left">{index + 1}</td>
										<td>{item.name}</td>
										<td className="text-center w-[70px]">
											<div className="flex items-center gap-2 justify-center">{Number(item.quantity)}</div>
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
						<div className="flex gap-2 items-center">
							<img src={logoSvg} className="w-8 h-8" />
							<h2 className="font-bold"> Mausim Kafe</h2>
						</div>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};

const OrderList = ({
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

export default PaymentTable;
