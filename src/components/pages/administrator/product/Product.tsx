import { FC } from "react";
import AddProductName from "./addproductname/AddProductName";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddProduct from "./addprodcut/AddProduct";
interface ProductProps {
	className?: string;
}

const Product: FC<ProductProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Tabs defaultValue="add">
				<TabsList>
					<TabsTrigger value="add">Добавить товар</TabsTrigger>
					<TabsTrigger value="list">Список возможных продуктов</TabsTrigger>
				</TabsList>
				<TabsContent value="add">
					<AddProduct/>
				</TabsContent>
				<TabsContent value="list">
					<AddProductName />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Product;
