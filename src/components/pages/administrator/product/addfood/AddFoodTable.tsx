import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import { useGetAllFoodQuery, useGetOneFoodQuery } from "@/services/administrator/food/food.api";
import { TFood } from "@/services/administrator/food/food.types";
import { useState } from "react";
import StockSheet from "@/components/shared/StockSheet/StockSheet";
import MyPagination from "@/components/shared/MyPagination/MyPagination";

const columns: TColumns<TFood>[] = [
	{
		title: "Название сырья",
		dataIndex: "name",
	},
	{
		title: "Тип",
		render: (_, record) => <>{record.format.name}</>,
	},
	{
		title: "Категория",
		render: (_, record) => <>{record.category.name}</>,
	},
	{
		title: "Количество",
		render: (_, record) => <>{record.stock}</>,
	},
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];

const AddFoodTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading, isFetching } = useGetAllFoodQuery({ page: currentPage });
	return (
		<>
			<MyTable source={data?.data || []} columns={columns} loading={isLoading} fetching={isFetching} />
			<MyPagination
				totalPosts={data?.meta?.total || 1}
				postsPerPage={10}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
};

const Actions = ({ record }: { record: TFood }) => {
	const { data } = useGetOneFoodQuery(record.id);

	const [open, setOpen] = useState(false);
	if (!record.stock) {
		return <></>;
	}
	return (
		<>
			<Button onClick={() => setOpen(true)} variant={"outline"} size={"sm"}>
				История
			</Button>
			<StockSheet data={data?.data.expense} open={open} onOpenChange={(val) => setOpen(val)}>
				<></>
			</StockSheet>
		</>
	);
};

export default AddFoodTable;
