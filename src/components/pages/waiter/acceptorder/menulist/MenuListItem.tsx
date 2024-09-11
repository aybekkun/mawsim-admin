import { FC } from "react";
import cn from "classnames";
import styles from "../AcceptOrder.module.scss";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface MenuListItemProps {
	className?: string;
	item: {
		id: number;
		name: string;
		price: number;
		image: string;
		quantity: number;
	};

	handleQuantityChange?: (id: number, quantity: number) => void;
}

const MenuListItem: FC<MenuListItemProps> = ({ item, className = ``, handleQuantityChange = () => undefined }) => {
	return (
		<div className={cn(className, styles.menuitem)}>
			<img src={item.image} alt={item.name} />
			<div className="flex-1">
				<h3>{item.name}</h3>
				<p>{item.price.toFixed(2)}</p>
			</div>
			<div className={styles.buttons}>
				<Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>
					-
				</Button>
				<Input
					type="number"
					value={item.quantity}
					onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
					className="w-16 text-center"
				/>
				<Button variant="outline" size="icon" onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>
					+
				</Button>
			</div>
		</div>
	);
};

export default MenuListItem;
