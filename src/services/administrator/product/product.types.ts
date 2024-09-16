export type TProductList = {
	id: number;
	productName: string;
	type: string;
};

export type TStockHistory = {
	date: string; // Дата поступления на склад
	quantityReceived: number; // Количество поступивших товаров
};

export type TProduct = {
	id: number; // Уникальный идентификатор продукта
	productName: string; // Название продукта
	quantity: number; // Количество на складе
	type: "unit" | "kg" | "liter" | string; // Тип измерения (единица, килограмм, литр)
	price: number; // Цена за единицу товара
	totalPrice: number; // Общая цена (количество * цена)
	stockHistory: TStockHistory[]; // История поступлений на склад
};
