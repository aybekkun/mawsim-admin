import { FC } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { PencilLine, Trash2 } from "lucide-react";
import { TProductList } from "@/services/administrator/product/product.types";
import EditProductForm from "./form/EditProdcutForm";

interface ProductListProps {
	products: TProductList[];
	setEditingItem: (product: TProductList) => void;
	onDelete: (id: number) => void;
	editingItem: TProductList | null;
	onEdit: (product: TProductList) => void;
}

const ProductList: FC<ProductListProps> = ({ products, setEditingItem, onDelete, editingItem, onEdit }) => (
	<ul className="space-y-2 mt-4">
		{products.map((product) =>
			editingItem?.id === product.id ? (
				<EditProductForm key={product.id} editingItem={editingItem} setEditingItem={setEditingItem} onEdit={onEdit} />
			) : (
				<li className="flex space-x-2" key={product.id}>
					<div className="flex justify-between items-center flex-1 space-x-2">
						<span>{product.productName}</span>
						<Badge>{product.type}</Badge>
					</div>
					<Button onClick={() => setEditingItem(product)} size="icon" variant="outline">
						<PencilLine />
					</Button>
					<Button onClick={() => onDelete(product.id)} size="icon" variant="destructive">
						<Trash2 />
					</Button>
				</li>
			)
		)}
	</ul>
);

export default ProductList;
