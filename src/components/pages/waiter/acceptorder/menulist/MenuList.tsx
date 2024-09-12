import { FC } from "react";
import styles from "../AcceptOrder.module.scss";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import MenuListItem from "./MenuListItem";
import { useMenuStore } from "@/store/useMenuStore";
interface MenuListProps {
	className?: string;
}

const MenuList: FC<MenuListProps> = ({ className = `` }) => {
	const { orders, setQuantity } = useMenuStore();
	return (
		<Card className={styles.menulist + " " + className}>
			<CardHeader>
				<CardTitle>Меню</CardTitle>
			</CardHeader>
			<CardContent>
				{orders.map((item) => (
					<MenuListItem item={item} key={item.id} handleQuantityChange={setQuantity} />
				))}
			</CardContent>
		</Card>
	);
};

export default MenuList;
