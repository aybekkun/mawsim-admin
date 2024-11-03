import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllOrderQuery } from "@/services/waiter/menu/menu.api";
import { TOrder } from "@/services/waiter/menu/menu.types";
import { useState } from "react";
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
		title: "Статус",
		render: (_, record) => <>{record.status.name}</>,
	},
];

const CancelOrders = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, isFetching } = useGetAllOrderQuery({ status_id: 3, page: currentPage, limit: 10 });
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

export default CancelOrders;
