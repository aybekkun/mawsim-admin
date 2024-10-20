import { TFood } from "@/services/types/global.types";
import { create } from "zustand";

type TBasket = {
	items: {
		price: number;
		food: TFood["food"];
		quantity: number;
		id: number;
	}[];

	totalPrice: number;
	addItem: ({ id, food, price }: { id: number; food: TFood["food"]; price: number }) => void;
	removeItem: (id: number) => void;
	clearBasket: () => void;
	decreaseQuantity: (id: number) => void;
};

export const useBasketStore = create<TBasket>((set) => ({
	items: [],
	totalPrice: 0,
	addItem: (newItem) =>
		set((state) => {
			const existingItem = state.items.find((item) => item.id === newItem.id);
			if (existingItem) {
				// Обновляем количество, если товар уже есть в корзине
				return {
					items: state.items.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item)),
					totalPrice: Number(state.totalPrice) + Number(newItem.price),
				};
			}
			// Добавляем новый товар в корзину
			return {
				items: [...state.items, { ...newItem, quantity: 1 }],
				totalPrice: Number(state.totalPrice) + Number(newItem.price),
			};
		}),
	decreaseQuantity: (id) =>
		set((state) => {
			const item = state.items.find((item) => item.id === id);
			if (!item) return state;

			const newQuantity = item.quantity - 1;

			if (newQuantity <= 0) {
				// Удаляем товар, если количество стало 0 или меньше
				return {
					items: state.items.filter((item) => item.id !== id),
					totalPrice: Number(state.totalPrice) - Number(item.price) * Number(item.quantity),
				};
			}

			return {
				items: state.items.map((i) => (i.id === id ? { ...i, quantity: newQuantity } : i)),
				totalPrice: Number(state.totalPrice) - Number(item.price),
			};
		}),
	clearBasket: () => {
		set({ items: [], totalPrice: 0 });
	},
	removeItem: (id) =>
		set((state) => {
			const itemToRemove = state.items.find((item) => item.id === id);
			if (!itemToRemove) return state;

			const updatedItems = state.items.filter((item) => item.id !== id);
			return {
				items: updatedItems,
				totalPrice: Number(state.totalPrice) - Number(itemToRemove.price) * Number(itemToRemove.quantity),
			};
		}),
}));
