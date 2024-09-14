import create from "zustand";
import { menuListData } from "@/data/menuList.data";

interface Order {
	id: number;
	name: string;
	price: number;
	image: string;
	quantity: number;
	totalPrice: number;
}

interface MenuStore {
	orders: Order[];
	setQuantity: (id: number, quantity: number) => void;
	setClear: () => void;
}

export const useMenuStore = create<MenuStore>((set) => ({
	orders: menuListData.map((item) => ({ ...item, quantity: 0, totalPrice: 0 })),
	setQuantity: (id: number, quantity: number) =>
		set((state) => ({
			orders: state.orders.map((order) =>
				order.id === id
					? {
							...order,
							quantity: Math.max(0, quantity),
							totalPrice: Math.max(0, quantity) * order.price, // Обновляем общую цену
						}
					: order
			),
		})),
	setClear: () => set((state) => ({ orders: state.orders.map((order) => ({ ...order, quantity: 0 })) })),
}));
