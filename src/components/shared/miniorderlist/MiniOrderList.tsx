import { FC } from "react";

interface MiniOrderListProps {
	className?: string;
	orders: {
		id: number;
		name: string;
		price: number;
		quantity: number;
		totalPrice: number;
	}[];
	totalAllPrice?: number;
}

const MiniOrderList: FC<MiniOrderListProps> = ({ className = ``, orders, totalAllPrice = 0 }) => {
	return (
		<div className={className}>
			<table className="w-full">
				<thead>
					<tr className="border-y border-dashed">
						<th className="text-left">Имя</th>
						<th className="text-center">Количество</th>
						<th className="text-right">Цена</th>
					</tr>
				</thead>
				<tbody>
					{orders.map((order) => (
						<Item key={order.id} {...order} />
					))}
				</tbody>
			</table>
			<div>
				<p className="text-xs flex justify-between">
					<b>Общая сумма:</b> <span>{totalAllPrice}</span>
				</p>
			</div>
		</div>
	);
};

const Item: FC<MiniOrderListProps["orders"][0]> = ({ name, quantity, totalPrice }) => {
	return (
		<tr className="border-y border-dashed">
			<td>{name}</td>
			<td className="text-center">{quantity}</td>
			<td className="text-right">{totalPrice}</td>
		</tr>
	);
};

export default MiniOrderList;
