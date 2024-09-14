import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { TProductList } from "@/services/administrator/product/product.types";
import SelectProductType from "@/components/shared/selectproducttype/SelectProductType";

interface EditProductFormProps {
	editingItem: TProductList;
	setEditingItem: (item: TProductList) => void;
	onEdit: (product: TProductList) => void;
}

const EditProductForm: FC<EditProductFormProps> = ({ editingItem, setEditingItem, onEdit }) => (
	<div className="flex space-x-2">
		<Input
			value={editingItem.productName}
			onChange={(e) => setEditingItem({ ...editingItem, productName: e.target.value })}
		/>
		<div className="flex-1">
			<SelectProductType
				value={editingItem.type}
				onValueChange={(value) => setEditingItem({ ...editingItem, type: value })}
			/>
		</div>
		<Button onClick={() => onEdit(editingItem)} size="icon">
			<Check />
		</Button>
	</div>
);

export default EditProductForm;
