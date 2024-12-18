import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FC } from "react";
import MenuCard from "./menucard/MenuCard";
import ShopCart from "./ShopCart";
import { useGetAllWaiterMenuQuery } from "@/services/waiter/menu/menu.api";
import ActiveOrders from "./ActiveOrders";

interface AcceptOrderProps {
	className?: string;
}

const AcceptOrder: FC<AcceptOrderProps> = ({ className = `` }) => {
	const { data } = useGetAllWaiterMenuQuery({});

	const food = data?.data
		.filter((item) => item.food.category.name === "еда" && Number(item.food.stock) > 0)
		.map((item) => <MenuCard key={item.id} {...item} />);
	const drinks = data?.data
		.filter((item) => item.food.category.name === "напитки" && Number(item.food.stock) > 0)
		.map((item) => <MenuCard key={item.id} {...item} />);
	return (
		<div className={className}>
			<Tabs defaultValue="foods">
				<div className="flex justify-between flex-wrap gap-2">
					<TabsList className="">
						<TabsTrigger value="foods">Еда</TabsTrigger>
						<TabsTrigger value="drinks">Напитки</TabsTrigger>
					</TabsList>
					<div className="flex gap-2 flex-wrap">
						<ActiveOrders />
						<ShopCart />
					</div>
				</div>
				<TabsContent value="foods">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">{food}</div>
				</TabsContent>
				<TabsContent value="drinks">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">{drinks}</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AcceptOrder;
