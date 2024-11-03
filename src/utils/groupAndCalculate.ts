type Item = {
	id: number;
	name: string;
	quantity: string | number;
	price: string | number;
};

export type GroupedItem = {
	id: number;
	name: string;
	quantity: number;
	price: number;
	totalPrice: number;
};

export function groupAndCalculate(items: Item[]): GroupedItem[] {
	const groupedItems = items.reduce<Record<number, { name: string; quantity: number; price: number }>>((acc, item) => {
		const { id, name, quantity, price } = item;
		if (!acc[id]) {
			acc[id] = { name, quantity: 0, price: parseFloat(String(price)) }; // Инициализируем новую запись
		}
		acc[id].quantity += parseFloat(String(quantity)); // Суммируем количество
		return acc;
	}, {});

	return Object.entries(groupedItems).map(([id, item]) => ({
		id: parseInt(id, 10),
		name: item.name,
		quantity: parseFloat(item.quantity.toFixed(2)),
		price: parseFloat(item.price.toFixed(2)),
		totalPrice: parseFloat((item.quantity * item.price).toFixed(2)), // Рассчитываем общую цену как quantity * price
	}));
}
