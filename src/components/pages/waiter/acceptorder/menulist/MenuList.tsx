import { FC, useState } from "react";
import styles from "../AcceptOrder.module.scss";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { menuListData } from "@/data/menuList.data";
import MenuListItem from "./MenuListItem";
interface MenuListProps {
	className?: string;
}

const MenuList: FC<MenuListProps> = ({ className = `` }) => {
	const [orders, setOrders] = useState(menuListData.map((item) => ({ ...item, quantity: 0 })));

	const handleQuantityChange = (id: number, quantity: number) => {
		setOrders(orders.map((order) => (order.id === id ? { ...order, quantity: Math.max(0, quantity) } : order)));
	};
	return (
		<Card className={styles.menulist + " " + className}>
			<CardHeader>
				<CardTitle>Меню</CardTitle>
			</CardHeader>
			<CardContent>
				{orders.map((item) => (
					<MenuListItem item={item} key={item.id} handleQuantityChange={handleQuantityChange} />
				))}
			</CardContent>
		</Card>
	);
};

export default MenuList;
