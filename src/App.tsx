import { Route, Routes, useNavigate } from "react-router-dom";

import { Toaster } from "@/components/ui/toaster";
import MainLayout from "./components/layout/main/MainLayout";
import { ROUTES } from "./constants/routes";
import Finance from "./components/pages/director/finance/Finance";
import WarehouseStats from "./components/pages/director/warehousestats/WarehouseStats";
import OrderStats from "./components/pages/director/orderstats/OrderStats";
import ProductList from "./components/pages/director/prroductlist/ProductList";
import Warehouse from "./components/pages/administrator/warehouse/Warehouse";
import Expense from "./components/pages/administrator/expense/Expense";
import Product from "./components/pages/administrator/product/Product";
import Orders from "./components/pages/waiter/orders/Orders";
import AcceptOrder from "./components/pages/waiter/acceptorder/AcceptOrder";
import Payment from "./components/pages/cash/Payment";
import Basket from "./components/pages/waiter/basket/Basket";
import AuthLayout from "./components/layout/auth/AuthLayout";
import { useAuthPersistStore } from "./store";
import { useEffect } from "react";
import Settings from "./components/pages/director/settings/Settings";
import { useCategoriesPersistStore } from "./store/useCategoriesPersistStore";
import MenuList from "./components/pages/administrator/menulist/MenuList";
import ExpenseStats from "./components/pages/director/expense/ExpenseStats";

function App() {
	const navigate = useNavigate();
	const { isAuth, fetchCheckAuthMe } = useAuthPersistStore();
	const { fetchCatergories } = useCategoriesPersistStore();
	useEffect(() => {
		fetchCatergories();
		fetchCheckAuthMe();
		if (!isAuth) navigate("/login");
	}, [isAuth]);

	return (
		<>
			<Routes>
				<Route path="/login" element={<AuthLayout />} />
				<Route path="/" element={<MainLayout />}>
					<Route path="/settings" element={<Settings />} />
					<Route path={"/"} element={<Finance />} />
					<Route path={ROUTES.WAREHOUSE_STATS.route} element={<WarehouseStats />} />
					<Route path={ROUTES.ORDER_STATS.route} element={<OrderStats />} />
					<Route path={ROUTES.EXPENSE_STATS.route} element={<ExpenseStats />} />

					<Route path={ROUTES.PRODUCT_LIST.route} element={<ProductList />} />
					<Route path={ROUTES.PAYMENT.route} element={<Payment />} />
					<Route path={ROUTES.ACCEPT_ORDER.route} element={<AcceptOrder />} />
					<Route path={"/basket"} element={<Basket />} />

					<Route path={ROUTES.ORDERS.route} element={<Orders />} />
					<Route path={ROUTES.PRODUCT.route} element={<Product />} />
					<Route path={ROUTES.MENU_LIST.route} element={<MenuList />} />
					<Route path={ROUTES.EXPENSE.route} element={<Expense />} />
					<Route path={ROUTES.WAREHOUSE.route} element={<Warehouse />} />
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
