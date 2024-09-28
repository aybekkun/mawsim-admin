import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import StockSheet from "@/components/shared/StockSheet/StockSheet";
import { Button } from "@/components/ui/button";

import { useGetOneProductsQuery, useGetAllProductsQuery } from "@/services/administrator/product/product.api";
import { TProducts } from "@/services/administrator/product/product.types";

import { FC, useState } from "react";

const columns: TColumns<TProducts>[] = [
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
	{
		title: "Действия",
		render: (_, record) => <Actions record={record} />,
	},
];

const AddRawMaterialTable: FC = () => {
	const { data, isLoading } = useGetAllProductsQuery();
	return (
		<>
			<MyTable loading={isLoading} columns={columns} source={data?.data || []} />
		</>
	);
};

const Actions = ({ record }: { record: TProducts }) => {
	const { data } = useGetOneProductsQuery(record.id);

	const [open, setOpen] = useState(false);
	if (!record.stock) {
		return <></>;
	}
	return (
		<>
			<Button onClick={() => setOpen(true)} variant={"outline"} size={"sm"}>
				История
			</Button>
			<StockSheet data={data?.data.expenses} open={open} onOpenChange={(val) => setOpen(val)}>
				<></>
			</StockSheet>
		</>
	);
};
export default AddRawMaterialTable;
