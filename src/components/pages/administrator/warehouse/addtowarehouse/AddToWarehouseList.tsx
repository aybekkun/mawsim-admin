import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { FC, useState } from "react";
import AddToWarehouseListTable from "./table/AddToWarehouseListTable";
import { useGetAllProductsQuery } from "@/services/administrator/product/product.api";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import AddToWarehouseForm from "./form/AddToWarehouseForm";

interface AddToWarehouseListProps {
	className?: string;
}

const AddToWarehouseList: FC<AddToWarehouseListProps> = ({ className = `` }) => {
	const { data } = useGetAllProductsQuery();
	const [open, setOpen] = useState(false);
	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					Список добавленных продуктов{" "}
					<Button onClick={() => setOpen(true)} size={"icon"}>
						<Plus />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<MyDialog onOpenChange={(val) => setOpen(val)} open={open} title="Доавить на склад">
					<AddToWarehouseForm />
				</MyDialog>
				<AddToWarehouseListTable items={data || []} />
			</CardContent>
		</Card>
	);
};

export default AddToWarehouseList;
