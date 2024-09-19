import { FC } from "react";
import OrderPayList from "./orderpaylist/OrderPayList";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Payment: FC = () => {
	return (
		<>
			<Tabs defaultValue="active" className="">
				<TabsList>
					<TabsTrigger value="active">Не оплаченые</TabsTrigger>
					<TabsTrigger value="closed">Оплаченные</TabsTrigger>
				</TabsList>
				<TabsContent value="active" className="w-full">
					<OrderPayList />
				</TabsContent>
				<TabsContent value="closed">
					<OrderPayList />
				</TabsContent>
			</Tabs>
		</>
	);
};

export default Payment;
