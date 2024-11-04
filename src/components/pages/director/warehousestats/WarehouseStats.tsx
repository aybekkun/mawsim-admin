import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Card, CardContent } from "@/components/ui/card";
import { useGetAllWarehouseProductsQuery } from "@/services/director/director.api";
import { TFoodExpense } from "@/services/director/director.types";
import { FC, useState } from "react";
const columns: TColumns<TFoodExpense>[] = [
	{
		title: "Название сырья",
		dataIndex: "name",
	},
	{
		title: "Тип",
		render: (_, record) => <>{record.format.name}</>,
	},
	{
		title: "Количество",
		render: (_, record) => <>{record.stock}</>,
	},
];

const WarehouseStats: FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllWarehouseProductsQuery({ page: currentPage });
	return (
		<div className={"space-y-4"}>
			<h2 className="text-3xl font-bold tracking-tight">Товары склада</h2>
			<Card>
				<CardContent>
					<MyTable columns={columns} source={data?.data || []} loading={isLoading} />
				</CardContent>
			</Card>
			<MyPagination
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
			/>
		</div>
	);
};

export default WarehouseStats;
