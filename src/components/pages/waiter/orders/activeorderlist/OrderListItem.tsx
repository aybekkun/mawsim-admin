import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardList, Clock, X } from "lucide-react";
import { FC } from "react";

interface OrderListItemProps {
	className?: string;
}

const OrderListItem: FC<OrderListItemProps> = ({ className = `` }) => {
	return (
		<Card className={" " + className}>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Стол 1</CardTitle>
				<Badge>Открытый</Badge>
			</CardHeader>
			<CardContent>
				<div className="text-sm font-bold">№2231 заказ</div>
				<p className="text-xs text-muted-foreground">{23} штук</p>
				<div className="flex items-center mt-2 text-sm text-muted-foreground">
					<Clock className="h-4 w-4 mr-1" />
					Jun 10, 12:30 PM
				</div>
			</CardContent>
			<CardFooter className="flex justify-between gap-1 flex-wrap">
				<Button size={"icon"}>
					<ClipboardList className="h-4 w-4" />
				</Button>
				<Button size={"sm"}>
					<X /> Закрыть
				</Button>
			</CardFooter>
		</Card>
	);
};

export default OrderListItem;
