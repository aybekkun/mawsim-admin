import MyTable, { TColumns } from "@/components/shared/MyTable/MyTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { rawMaterialData } from "@/data/rawMaterial.data";
import { Edit2 } from "lucide-react";
import { FC } from "react";

interface AddRawMaterialTableProps {
	className?: string;
}

const columns: TColumns<(typeof rawMaterialData)[0]>[] = [
	{
		title: "Название сырья",
		dataIndex: "productName",
	},
	{
		title: "Количество",
		dataIndex: "quantity",
	},
	{
		title: "Тип",
		dataIndex: "type",
	},
	{
		title: "Цена за единицу",
		dataIndex: "price",
	},
	{
		title: "Цена",
		dataIndex: "totalPrice",
	},
	{
		title: "История поступления",
		render: (_) => (
			<Button variant={"outline"} size={"sm"}>
				История
			</Button>
		),
	},
	{
		title: "Actions",
		render: (_) => (
			<div className="flex gap-2 items-center">
				<Button size={"icon"}>
					<Edit2 />
				</Button>
				<Button variant={"destructive"} size={"sm"}>
					Удалить
				</Button>
			</div>
		),
	},
];

const AddRawMaterialTable: FC<AddRawMaterialTableProps> = ({ className = `` }) => {
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Список добавленных сырья</CardTitle>
			</CardHeader>
			<CardContent>
				<MyTable source={rawMaterialData} columns={columns} />
			</CardContent>
		</Card>
	);
};

export default AddRawMaterialTable;
