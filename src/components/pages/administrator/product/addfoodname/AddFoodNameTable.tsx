import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import { useDeleteFoodNameMutation, useGetAllFoodNameQuery } from "@/services/administrator/food/food.api";
import { TFoodName } from "@/services/administrator/food/food.types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AddFoodNameForm from "./AddFoodNameForm";
import MyPagination from "@/components/shared/MyPagination/MyPagination";

const columns: TColumns<TFoodName>[] = [
	{
		title: "Название",
		dataIndex: "name",
	},

	{
		title: "Тип",
		render: (_, record) => <>{record.format.name}</>,
	},
	{
		title: "Описание",
		dataIndex: "description",
	},
	{
		title: "Категория",
		render: (_, record) => <>{record.category.name}</>,
	},
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];
const AddFoodNameTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllFoodNameQuery({ page: currentPage, limit: 10 });

	return (
		<>
			<MyTable currentPage={currentPage} source={data?.data || []} columns={columns} loading={isLoading} />
			<MyPagination
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
};

export default AddFoodNameTable;

const Actions = ({ record }: { record: TFoodName }) => {
	const { mutate: deleteProduct, isPending } = useDeleteFoodNameMutation();
	const [open, setOpen] = useState(false);
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить продукт?")) await deleteProduct(record.id);
	};
	return (
		<div className="space-x-2 flex items-center">
			<Button onClick={() => setOpen(true)} variant="outline" size={"icon"}>
				<Pencil className="h-4 w-4" />
			</Button>
			<Button disabled={isPending} onClick={onDelete} variant="destructive" size={"icon"}>
				<Trash2 className="h-4 w-4" />
			</Button>
			<AddFoodNameForm type="edit" obj={record} open={open} setOpen={setOpen} />
		</div>
	);
};
