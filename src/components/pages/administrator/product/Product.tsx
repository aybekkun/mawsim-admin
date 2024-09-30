import { FC, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddFoodName from "./addfoodname/AddFoodName";
import AddFood from "./addfood/AddFood";

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
				<AddFood />
			</TabsContent>
			<TabsContent value="addName">
				<AddFoodName />
			</TabsContent>
		</Tabs>
	);
};

export default Product;
