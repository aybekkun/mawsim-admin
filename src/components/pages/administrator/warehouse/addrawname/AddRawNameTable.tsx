import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import {
	useDeleteProductsNameMutation,
	useGetAllProductsNameQuery,
} from "@/services/administrator/product/product.api";
import { TProductsName } from "@/services/administrator/product/product.types";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import AddRawNameForm from "./AddRawNameForm";
import MyPagination from "@/components/shared/MyPagination/MyPagination";

const columns: TColumns<TProductsName>[] = [
	{
		title: "Название сырья",
		dataIndex: "name",
	},
	{
		title: "Тип",
		render: (_, record) => <>{record.format.name}</>,
	},
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];
const AddRawNameTable = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const { data, isLoading } = useGetAllProductsNameQuery({ page: currentPage, limit: 10 });

	return (
		<>
			<MyTable currentPage={currentPage} loading={isLoading} columns={columns} source={data?.data || []} />
			<MyPagination
				totalPosts={data?.meta.total || 0}
				postsPerPage={10}
				currentPage={currentPage}
				setCurrentPage={setCurrentPage}
			/>
		</>
	);
};

export default AddRawNameTable;

const Actions = ({ record }: { record: TProductsName }) => {
	const { mutate: deleteProduct, isPending } = useDeleteProductsNameMutation();
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
			<AddRawNameForm type="edit" obj={record} open={open} setOpen={setOpen} />
		</div>
	);
};
