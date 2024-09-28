import { FC } from "react";


import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddRawMaterial from "./addrawmaterial/AddRawMaterial";
import AddRawName from "./addrawname/AddRawName";
interface WarehouseProps {
	className?: string;
}

const Warehouse: FC<WarehouseProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Tabs defaultValue="add" className={className}>
				<TabsList>
					<TabsTrigger value="add">Добавить сырье</TabsTrigger>
					<TabsTrigger value="addName">Добавить название сырья</TabsTrigger>
				</TabsList>
				<TabsContent value="add">
					<AddRawMaterial />
				</TabsContent>
				<TabsContent value="addName">
					<AddRawName />
				</TabsContent>
			</Tabs>
		</div>
	);
};

{
	/* <Tabs defaultValue="add" className={className}>
<TabsList>
    <TabsTrigger value="add">Добавить сырье</TabsTrigger>
    <TabsTrigger value="addName">
        Добавить название сырья
    </TabsTrigger>
</TabsList>
<TabsContent value="add">
    <AddToWarehouse />
</TabsContent>
<TabsContent value="addName">
    <AddNameToWarehouse />
</TabsContent>
</Tabs> */
}
export default Warehouse;
