import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

import { FC } from "react";
import ActiveOrderList from "./activeorderlist/ActiveOrderList";
import ClosedOrders from "./closedorder/ClosedOrders";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import CancelOrders from "./cancelorder/CancelOrders";

interface OrdersProps {
	className?: string;
}

const Orders: FC<OrdersProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Tabs defaultValue="active">
				<ScrollArea>
					<TabsList>
						<TabsTrigger value="active">Активные</TabsTrigger>
						<TabsTrigger value="closed">Закрытые</TabsTrigger>
						<TabsTrigger value="cancel">Отмененны заказы</TabsTrigger>
						<ScrollBar orientation="horizontal" />
					</TabsList>
				</ScrollArea>
				<TabsContent value="active">
					<ActiveOrderList />
				</TabsContent>
				<TabsContent value="closed">
					<ClosedOrders />
				</TabsContent>
				<TabsContent value="cancel">
					<CancelOrders/>
				</TabsContent>
				
			</Tabs>
		</div>
	);
};

export default Orders;
