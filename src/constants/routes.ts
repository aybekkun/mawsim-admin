const createRoute = (path: string, name: string) => ({
	route: path,
	name,
});

export const ROUTES = {
	HOME: createRoute("/", "Главная"),
	FINANCE: createRoute("/finance", "Финансы"),
	WAREHOUSE_STATS: createRoute("/warehouse-stats", "Товары на складе"),
	ORDER_STATS: createRoute("/order-stats", "Статистика заказов"),
	PRODUCT_LIST: createRoute("/product-list", "Список товаров"),
	ACCEPT_ORDER: createRoute("/accept-order", "Принять заказ"),
};
