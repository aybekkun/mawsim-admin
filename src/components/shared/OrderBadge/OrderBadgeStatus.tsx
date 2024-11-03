import { Badge } from "@/components/ui/badge";
import { FC } from "react";

interface OrderBadgeStatusProps {
	id?: number;
}

const OrderBadgeStatus: FC<OrderBadgeStatusProps> = ({ id = 0 }) => {
	switch (id) {
		case 1: {
			return <Badge className="bg-red-600">ожидается</Badge>;
		}
		case 2: {
			return <Badge>завершен</Badge>;
		}
		case 3: {
			return <Badge className="bg-slate-900">Отменен</Badge>;
		}
	}
};

export default OrderBadgeStatus;
