import { Badge } from "@/components/ui/badge";
import { FC } from "react";

interface OrderBadgeTakeawayProps {
	is_takeaway?: boolean;
}

const OrderBadgeTakeaway: FC<OrderBadgeTakeawayProps> = ({ is_takeaway = false }) => {
	return <Badge className={is_takeaway ? "bg-slate-900" : ""}>{is_takeaway ? "Собой" : "Заказ"}</Badge>;
};

export default OrderBadgeTakeaway;
