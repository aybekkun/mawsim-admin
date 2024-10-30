import { FC } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddRawMaterial from "./addrawmaterial/AddRawMaterial";
import AddRawName from "./addrawname/AddRawName";
import RawMaterialsExpense from "./expense/RawMaterialsExpense";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
interface WarehouseProps {
	className?: string;
}

const Warehouse: FC<WarehouseProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Tabs defaultValue="add" className={className}>
				<ScrollArea className="horizontal w-92">
					<TabsList>
						<TabsTrigger value="expenses">Расходы склада</TabsTrigger>
						<TabsTrigger value="add">Добавить сырье</TabsTrigger>
						<TabsTrigger value="addName">Добавить название сырья</TabsTrigger>
						<ScrollBar orientation="horizontal" />
					</TabsList>
				</ScrollArea>
				<TabsContent value="add">
					<AddRawMaterial />
				</TabsContent>
				<TabsContent value="addName">
					<AddRawName />
				</TabsContent>
				<TabsContent value="expenses">
					<RawMaterialsExpense />
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
