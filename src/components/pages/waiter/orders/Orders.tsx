import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { FC } from "react";
import ActiveOrderList from "./activeorderlist/ActiveOrderList";

interface OrdersProps {
	className?: string;
}

const Orders: FC<OrdersProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Tabs defaultValue="active">
				<TabsList>
					<TabsTrigger value="active">Активные</TabsTrigger>
					<TabsTrigger value="closed">Закрытые</TabsTrigger>
				</TabsList>
				<TabsContent value="active">
					<ActiveOrderList />
				</TabsContent>
				<TabsContent value="closed">Closed</TabsContent>
			</Tabs>
		</div>
	);
};

export default Orders;
