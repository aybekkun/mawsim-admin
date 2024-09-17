import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	useDeleteProductsListMutation,
	useGetAllProductsListQuery,
} from "@/services/administrator/product/product.api";
import { TProductList } from "@/services/administrator/product/product.types";
import { Pencil, Trash2 } from "lucide-react";
import { FC, useState } from "react";
import EditNameForm from "./form/EditNameForm";

interface AddNameListProps {
	className?: string;
}

const AddNameList: FC<AddNameListProps> = ({ className = `` }) => {
	const [editItem, setEditItem] = useState<TProductList | null>(null);
	const { data, isLoading, isError } = useGetAllProductsListQuery();
	const list = data?.map((item, index) =>
		editItem?.id === item.id ? (
			<EditNameForm editItem={editItem} setEditItem={()=>setEditItem(null)} key={item.id} />
		) : (
			<ProductNameListItem setEditItem={setEditItem} key={item.id} item={item} index={index + 1} />
		)
	);
	const skeleton = isLoading && <Skeleton className="w-full h-40" />;

	if (isError) {
		return <>Error</>;
	}
	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle>Лист название продукта</CardTitle>
				</CardHeader>
				<CardContent>{skeleton || list}</CardContent>
			</Card>
		</div>
	);
};

type ProductNameListItemProps = {
	item: TProductList;
	index: number;
	setEditItem: React.Dispatch<React.SetStateAction<TProductList | null>>;
};

const ProductNameListItem = ({ item, index, setEditItem }: ProductNameListItemProps) => {
	const { mutate: deleteProduct } = useDeleteProductsListMutation();
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить продукт?")) await deleteProduct(item.id);
	};

	return (
		<div className="flex space-x-2 mt-2 pb-1 borber-dashed  border-b ">
			<div className="flex-1 flex items-center">
				<span className="flex-1">
					{index + ". "}
					{item.productName}
				</span>
				<Badge>{item.type}</Badge>
			</div>
			<div className="space-x-2">
				<Button onClick={() => setEditItem(item)} className="w-8 h-8" size={"icon"}>
					<Pencil />
				</Button>
				<Button onClick={onDelete} variant={"destructive"} className="w-8 h-8" size={"icon"}>
					<Trash2 />
				</Button>
			</div>
		</div>
	);
};

export default AddNameList;
