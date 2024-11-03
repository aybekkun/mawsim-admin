import { FC, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

import PaymentTable from "./PaymentTable";
const Payment: FC = () => {
	const [status, setStatus] = useState(0);
	return (
		<>
			<Tabs defaultValue="active" className="mb-4">
				<ScrollArea>
					<TabsList>
						<TabsTrigger onClick={() => setStatus(0)} value="all">
							Все
						</TabsTrigger>
						<TabsTrigger onClick={() => setStatus(1)} value="active">
							Активные
						</TabsTrigger>
						<TabsTrigger onClick={() => setStatus(2)} value="closed">
							Завершенные
						</TabsTrigger>
						<TabsTrigger onClick={() => setStatus(3)} value="canceled">
							Отмененные
						</TabsTrigger>
					</TabsList>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</Tabs>
			<PaymentTable status_id={status} />
		</>
	);
};

export default Payment;
