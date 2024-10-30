import { FC, useState } from "react";
import OrderListItem from "./OrderListItem";
import { useGetAllOrderQuery } from "@/services/waiter/menu/menu.api";
import { Skeleton } from "@/components/ui/skeleton";
import MyPagination from "@/components/shared/MyPagination/MyPagination";

const ActiveOrderList: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllOrderQuery({ status_id: 1, page: currentPage });

	const skeleton = [1, 2, 3, 4].map((item) => <Skeleton key={item} className="w-full h-40" />);
	return (
		<>
			<h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Активные заказы: {data?.meta.total}</h2>
			<div className={"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"}>
				{isLoading ? skeleton : data?.data.map((item) => <OrderListItem key={item.id} order={item} />)}
			</div>
			<MyPagination
				className={"mt-4"}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
			/>
		</>
	);
};

export default ActiveOrderList;
