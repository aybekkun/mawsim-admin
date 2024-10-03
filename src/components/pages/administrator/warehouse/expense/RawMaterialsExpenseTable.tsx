import MyPagination from "@/components/shared/MyPagination/MyPagination";
import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import {
	useDeleteRawMaterialsExpenseMutation,
	useGetAllRawMaterialsExpenseQuery,
} from "@/services/administrator/product/product.api";
import { TRawMaterials } from "@/services/administrator/product/product.types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

const columns: TColumns<TRawMaterials>[] = [
	{
		title: "Название сырья",
		render: (_, record) => <>{record.product.name}</>,
	},
	{
		title: "Тип",
		render: (_, record) => <>{record.product.format.name}</>,
	},
	{
		title: "Количество",
		dataIndex: "quantity",
	},
	{
		title: "Дата",
		dataIndex: "date",
	},
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];

const RawMaterialsExpenseTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data } = useGetAllRawMaterialsExpenseQuery(currentPage);

	return (
		<>
			<MyTable currentPage={currentPage} columns={columns} source={data?.data || []} />
			<MyPagination
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
};
const Actions = ({ record }: { record: TRawMaterials }) => {
	const { mutate: deleteRaw, isPending } = useDeleteRawMaterialsExpenseMutation();
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить сырье?")) await deleteRaw(record.id);
	};
	return (
		<div className="space-x-2 flex items-center">
			<Button variant="outline" size={"icon"}>
				<Pencil className="h-4 w-4" />
			</Button>
			<Button disabled={isPending} onClick={onDelete} variant="destructive" size={"icon"}>
				<Trash2 className="h-4 w-4" />
			</Button>
		</div>
	);
};

export default RawMaterialsExpenseTable;
