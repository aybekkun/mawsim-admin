import SearchInput from "@/components/shared/search/SearchInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import pizzaImg from "../../../../assets/pizza.jpg";
import styles from "./AcceptOrder.module.scss";
import cn from "classnames";
interface AcceptOrderProps {
	className?: string;
}
const menuItems = [
	{ id: 1, name: "Margherita Pizza", price: 41000, image: pizzaImg },
	{ id: 2, name: "Caesar Salad", price: 35000, image: pizzaImg },
	{ id: 3, name: "Spaghetti Carbonara", price: 15000, image: pizzaImg },
	{ id: 4, name: "Grilled Salmon", price: 17000, image: pizzaImg },
	{ id: 5, name: "Grilled Sal12mon", price: 17000, image: pizzaImg },
	{ id: 6, name: "Grilled Salmon", price: 17000, image: pizzaImg },
	{ id: 7, name: "Grilled Salmo12n", price: 17000, image: pizzaImg },
	{ id: 8, name: "Grilled Salmon", price: 17000, image: pizzaImg },
];
const AcceptOrder: FC<AcceptOrderProps> = ({ className = `` }) => {
	const [orders, setOrders] = useState(menuItems.map((item) => ({ ...item, quantity: 0 })));

	const handleQuantityChange = (id: number, quantity: number) => {
		setOrders(orders.map((order) => (order.id === id ? { ...order, quantity: Math.max(0, quantity) } : order)));
	};
	return (
		<div className={cn(styles.root, className)}>
			<SearchInput />
			<div className={styles.content}>
				<Card className={styles.left}>
					<CardHeader>
						<CardTitle>Меню</CardTitle>
					</CardHeader>
					<CardContent>
						{orders.map((item) => (
							<div key={item.id} className={styles.menucard}>
								<img src={item.image} alt={item.name} />
								<div className="flex-1">
									<h3>{item.name}</h3>
									<p>{item.price.toFixed(2)}</p>
								</div>
								<div className={styles.buttons}>
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
									>
										-
									</Button>
									<Input
										type="number"
										value={item.quantity}
										onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value) || 0)}
										className="w-16 text-center"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
									>
										+
									</Button>
								</div>
							</div>
						))}
					</CardContent>
				</Card>
				<Card className={styles.right}>
					<CardHeader>
						<CardTitle>Заказ</CardTitle>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
};

export default AcceptOrder;
