import { FC, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ProductList from "./ProductList";
import { useProducts } from "../useProducts";
import { TProductList } from "@/services/administrator/product/product.types";
import AddProductForm from "./form/AddProductForm";

const AddProductName: FC = () => {
	const [editingItem, setEditingItem] = useState<TProductList | null>(null);
	const [newItem, setNewItem] = useState<Omit<TProductList, "id">>({ productName: "", type: "kilogram" });
	const { queryData, create, remove, update, isCreating } = useProducts();

	const onCreate = async () => {
		if (!newItem.productName) return;
		await create(newItem);
		setNewItem({ productName: "", type: "kilogram" }); // Сброс формы после добавления
	};

	const onDelete = async (id: number) => {
		if (window.confirm("Вы действительно хотите удалить продукт?")) await remove(id);
	};

	const onEdit = async (product: TProductList) => {
		if (window.confirm("Вы действительно хотите отредактировать продукт?")) {
			await update(product);
			setEditingItem(null);
		}
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Список продуктов</CardTitle>
			</CardHeader>
			<CardContent>
				<AddProductForm isCreating={isCreating} newItem={newItem} setNewItem={setNewItem} onCreate={onCreate} />
				<ProductList
					editingItem={editingItem}
					onEdit={onEdit}
					products={queryData.data || []}
					setEditingItem={setEditingItem}
					onDelete={onDelete}
				/>
			</CardContent>
		</Card>
	);
};

export default AddProductName;
