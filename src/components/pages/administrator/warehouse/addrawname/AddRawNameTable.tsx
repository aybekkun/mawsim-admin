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
	const { data, isLoading } = useGetAllProductsNameQuery();

	return <MyTable loading={isLoading} columns={columns} source={data?.data || []} />;
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
