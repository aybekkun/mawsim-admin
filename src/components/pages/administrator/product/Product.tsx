import { FC } from "react";
import AddName from "./addproductname/AddName";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddProduct from "./addproduct/AddProduct";

interface ProductProps {
	className?: string;
}

const Product: FC<ProductProps> = ({ className = `` }) => {
	return (
		<Tabs defaultValue="add" className={className}>
			<TabsList>
				<TabsTrigger value="add">Добавить продукт</TabsTrigger>
				<TabsTrigger value="addName">Добавить название продукта</TabsTrigger>
			</TabsList>
			<TabsContent value="add">
				<AddProduct />
			</TabsContent>
			<TabsContent value="addName">
				<AddName />
			</TabsContent>
		</Tabs>
	);
};

export default Product;
