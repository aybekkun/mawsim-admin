import { TProduct } from "@/services/administrator/product/product.types";
import { FC } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
interface AddProductListTableProps {
	className?: string;
	items: TProduct[];
}

const AddProductListTable: FC<AddProductListTableProps> = ({ items = [], className = `` }) => {
	return (
		<Table className={className}>
			<TableCaption>Список продуктов.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[70px]">№</TableHead>
					<TableHead>Название</TableHead>
					<TableHead>Количество</TableHead>
					<TableHead>Тип</TableHead>
					<TableHead>Цена</TableHead>
					<TableHead>Общая цена</TableHead>
					<TableHead>История</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{items.map((item, index) => (
					<TableRow key={item.id}>
						<TableCell className="font-bold text-left">{index+1}</TableCell>
						<TableCell>{item.productName}</TableCell>
						<TableCell>{item.quantity}</TableCell>
						<TableCell>{item.type}</TableCell>
						<TableCell>{item.price}</TableCell>
						<TableCell>{item.totalPrice}</TableCell>
						<TableCell>Смотреть</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};

export default AddProductListTable;
