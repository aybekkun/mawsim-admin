import { Route, Routes, useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import MainLayout from "./components/layout/main/MainLayout";
import { ROUTES } from "./constants/routes";

import WarehouseStats from "./components/pages/director/warehousestats/WarehouseStats";
import OrderStats from "./components/pages/director/orderstats/OrderStats";
import Warehouse from "./components/pages/administrator/warehouse/Warehouse";
import Expense from "./components/pages/administrator/expense/Expense";
import Product from "./components/pages/administrator/product/Product";
import Orders from "./components/pages/waiter/orders/Orders";
import AcceptOrder from "./components/pages/waiter/acceptorder/AcceptOrder";
import Payment from "./components/pages/cash/Payment";
import AuthLayout from "./components/layout/auth/AuthLayout";
import { useAuthPersistStore } from "./store";
import { useEffect } from "react";
import Settings from "./components/pages/director/settings/Settings";
import MenuList from "./components/pages/administrator/menulist/MenuList";
import ExpenseStats from "./components/pages/director/finance/expense/ExpenseStats";
import Salary from "./components/pages/director/finance/salary/Salary";
import Profit from "./components/pages/director/finance/profit/Profit";
import Home from "./components/pages/home/Home";
import FoodStats from "./components/pages/director/warehousestats/FoodStats";
import CafeTables from "./components/pages/administrator/cafetables/CafeTables";

function App() {
	const navigate = useNavigate();
	const { isAuth, fetchCheckAuthMe, user } = useAuthPersistStore();
	useEffect(() => {
		fetchCheckAuthMe();
		if (!isAuth) navigate("/login");
	}, [isAuth]);

	return (
		<>
			<Routes>
				<Route path="/login" element={<AuthLayout />} />
				<Route path="/" element={<MainLayout />}>
					{/* Директор */}
					<Route path={"/"} element={<Home />} />
					{user?.role_id === 2 && (
						<>
							<Route path={ROUTES.EXPENSE_STATS.route} element={<ExpenseStats />} />
							<Route path={ROUTES.SALARY_STATS.route} element={<Salary />} />
							<Route path={ROUTES.PROFIT_STATS.route} element={<Profit />} />
							<Route path={ROUTES.WAREHOUSE_STATS.route} element={<WarehouseStats />} />
							<Route path={ROUTES.ORDER_STATS.route} element={<OrderStats />} />
							<Route path={ROUTES.PRODUCT_LIST.route} element={<FoodStats />} />
						</>
					)}
					{/* Кассир */}
					{user?.role_id === 4 && (
						<>
							<Route path={ROUTES.ACCEPT_ORDER.route} element={<AcceptOrder />} />
							<Route path={ROUTES.ORDERS.route} element={<Orders />} />
							<Route path={ROUTES.PAYMENT.route} element={<Payment />} />
						</>
					)}
					{/* Официант */}
					{(user?.role_id === 3 || user?.role_id === 5) && (
						<>
							<Route path={ROUTES.ACCEPT_ORDER.route} element={<AcceptOrder />} />
							<Route path={ROUTES.ORDERS.route} element={<Orders />} />
							<Route path={ROUTES.PAYMENT.route} element={<Payment />} />
						</>
					)}
					{/* Администратор */}
					{user?.role_id === 1 && (
						<>
							<Route path={ROUTES.USERS.route} element={<Settings />} />
							<Route path={ROUTES.PRODUCT.route} element={<Product />} />
							<Route path={ROUTES.MENU_LIST.route} element={<MenuList />} />
							<Route path={ROUTES.EXPENSE.route} element={<Expense />} />
							<Route path={ROUTES.WAREHOUSE.route} element={<Warehouse />} />
							<Route path={ROUTES.CAFE_TABLES.route} element={<CafeTables />} />
							<Route path={ROUTES.ACCEPT_ORDER.route} element={<AcceptOrder />} />
							<Route path={ROUTES.ORDERS.route} element={<Orders />} />
							<Route path={ROUTES.PAYMENT.route} element={<Payment />} />
						</>
					)}
				</Route>

				{/* Страницы Дирекктор */}
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
{
	/* <Route path={ROUTES.FINANCE.route} element={<Finance />} />
<Route path={ROUTES.WAREHOUSE_STATS.route} element={<WarehouseStats />} />
<Route path={ROUTES.ORDER_STATS.route} element={<OrderStats />} />
<Route path={ROUTES.PRODUCT_LIST.route} element={<ProductList />} />
<Route path={ROUTES.PAYMENT.route} element={<Payment />} />
<Route path={ROUTES.ACCEPT_ORDER.route} element={<AcceptOrder />} />
<Route path={ROUTES.ORDERS.route} element={<Orders />} />
<Route path={ROUTES.PRODUCT.route} element={<Product />} />
<Route path={ROUTES.ORDER_LIST.route} element={<OrderList />} />
<Route path={ROUTES.EXPENSE.route} element={<Expense />} />
<Route path={ROUTES.WAREHOUSE.route} element={<Warehouse />} /> */
}
