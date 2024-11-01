const createRoute = (path: string, name: string) => ({
	route: path,
	name,
});

export const ROUTES = {
	//Главная
	HOME: createRoute("/", "Главная"),
	//Директорская
	FINANCE: createRoute("/finance", "Финансы"),
	PROFIT_STATS: createRoute("/profit-stats", "Прибыль"),
	SALARY_STATS: createRoute("/salary-stats", "Зарплата"),

	WAREHOUSE_STATS: createRoute("/warehouse-stats", "Товары на складе"),
	EXPENSE_STATS: createRoute("/expense-stats", "Статистика расходов"),
	ORDER_STATS: createRoute("/order-stats", "Статистика заказов"),
	PRODUCT_LIST: createRoute("/product-list", "Список товаров"),
	//Касса
	PAYMENT: createRoute("/payment", "Оплата"),
	//Официантская
	ORDERS: createRoute("/orders", "Заказы"),
	ACCEPT_ORDER: createRoute("/accept-order", "Принять заказ"),
	//Админстараторская
	EXPENSE: createRoute("/expense", "Расходы"),
	PRODUCT: createRoute("/product", "Товары"),
	WAREHOUSE: createRoute("/warehouse", "Склад"),
	MENU_LIST: createRoute("/menu-list", "Список меню"),
	USERS: createRoute("/users", "Работники"),
};
