import WatchOrders from "@/components/shared/WatchOrdersButton/WatchOrders";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {  Clock } from "lucide-react";

import { FC } from "react";

interface OrderPayListItemProps {
	className?: string;
}

const OrderPayListItem: FC<OrderPayListItemProps> = ({ className = `` }) => {
	return (
		<Card className={"mt-2 " + className}>
			<CardHeader className="p-2 flex flex-row justify-between items-start">
				<div>
					<CardTitle className="text-sm">Заказ №123</CardTitle>
					<CardDescription>Стол 12</CardDescription>
				</div>
				<Badge variant={"destructive"}>Не оплачен</Badge>
			</CardHeader>
			<CardContent className="p-2">
				<p className="text-xs text-muted-foreground">{23} штук</p>
				<div className="flex items-center mt-2 text-sm text-muted-foreground">
					<Clock className="h-4 w-4 mr-1" />
					Jun 10, 12:30 PM
				</div>
				<p className="text-sm font-bold">Цена c услугой: 234 000 сумм</p>
			</CardContent>
			<CardFooter className="p-2 flex gap-2">
				<WatchOrders />
				<Button>Оплатить</Button>
			</CardFooter>
		</Card>
	);
};

export default OrderPayListItem;
