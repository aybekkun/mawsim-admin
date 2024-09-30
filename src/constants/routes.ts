const createRoute = (path: string, name: string) => ({
	route: path,
	name,
});

export const ROUTES = {
	//Главная
	HOME: createRoute("/", "Главная"),
	//Директорская
	FINANCE: createRoute("/finance", "Финансы"),
	WAREHOUSE_STATS: createRoute("/warehouse-stats", "Товары на складе"),
	ORDER_STATS: createRoute("/order-stats", "Статистика заказов"),
	PRODUCT_LIST: createRoute("/product-list", "Список товаров"),
	//Касса
	PAYMENT: createRoute("/payment", "Оплата"),
	//Официантская
	ORDERS: createRoute("/orders", "Заказы"),
	ACCEPT_ORDER: createRoute("/accept-order", "Принять заказ"),
	//Админстараторская
	EXPENSE:createRoute("/expense","Расходы"),
	PRODUCT:createRoute("/product","Товары"),
	WAREHOUSE:createRoute("/warehouse","Склад"),
	MENU_LIST:createRoute("/menu-list","Список меню"),
};
