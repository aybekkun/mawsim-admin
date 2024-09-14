import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { TProductList } from "@/services/administrator/product/product.types";
import SelectProductType from "@/components/shared/selectproducttype/SelectProductType";

interface AddProductFormProps {
	isCreating: boolean;
	newItem: Omit<TProductList, "id">;
	setNewItem: (item: Omit<TProductList, "id">) => void;
	onCreate: () => void;
}

const AddProductForm: FC<AddProductFormProps> = ({ newItem, setNewItem, onCreate, isCreating }) => (
	<div className="flex space-x-2">
		<div className="flex-1">
			<Label htmlFor="name">Название</Label>
			<Input
				id="name"
				value={newItem.productName}
				onChange={(e) => setNewItem({ ...newItem, productName: e.target.value })}
				placeholder="Пишите название продукта"
			/>
		</div>
		<div className="flex-1">
			<Label htmlFor="type">Тип</Label>
			<SelectProductType value={newItem.type} onValueChange={(value) => setNewItem({ ...newItem, type: value })} />
		</div>
		<Button disabled={isCreating} onClick={onCreate} className="mt-6">
			Добавить
		</Button>
	</div>
);

export default AddProductForm;
