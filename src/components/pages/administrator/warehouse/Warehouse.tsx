import { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import AddToWarehouse from "./addtowarehouse/AddToWarehouse";
import AddNameToWarehouse from "./addnamewarehouse/AddNameToWarehouse";

interface WarehouseProps {
	className?: string;
}

const Warehouse: FC<WarehouseProps> = ({ className = `` }) => {
	return (
		<Tabs className={className}>
			<TabsList>
				<TabsTrigger value="add">Добавить продукт</TabsTrigger>
				<TabsTrigger value="addName">Добавить название продукта</TabsTrigger>
			</TabsList>
			<TabsContent value="add">
				<AddToWarehouse />
			</TabsContent>
			<TabsContent value="addName">
				<AddNameToWarehouse />
			</TabsContent>
		</Tabs>
	);
};

export default Warehouse;
