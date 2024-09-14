import MainLayout from "./components/layout/main/MainLayout";
import AcceptOrder from "./components/pages/waiter/acceptorder/AcceptOrder";
import Home from "./components/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Finance from "./components/pages/director/finance/Finance";
import WarehouseStats from "./components/pages/director/warehousestats/WarehouseStats";
import OrderStats from "./components/pages/director/orderstats/OrderStats";
import ProductList from "./components/pages/director/prroductlist/ProductList";
import Payment from "./components/pages/cash/payment/Payment";
import Orders from "./components/pages/waiter/orders/Orders";
import Product from "./components/pages/administrator/product/Product";
import OrderList from "./components/pages/administrator/orderlist/OrderList";
import Expense from "./components/pages/administrator/expense/Expense";
import Warehouse from "./components/pages/administrator/warehouse/Warehouse";

import { Toaster } from "@/components/ui/toaster";
function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route index element={<Home />} />
					{/* Страницы Дирекктор */}
					<Route path={ROUTES.FINANCE.route} element={<Finance />} />
					<Route path={ROUTES.WAREHOUSE_STATS.route} element={<WarehouseStats />} />
					<Route path={ROUTES.ORDER_STATS.route} element={<OrderStats />} />
					<Route path={ROUTES.PRODUCT_LIST.route} element={<ProductList />} />
					{/* КАССА */}
					<Route path={ROUTES.PAYMENT.route} element={<Payment />} />
					{/* ОФИЦИАНТСКАЯ */}
					<Route path={ROUTES.ACCEPT_ORDER.route} element={<AcceptOrder />} />
					<Route path={ROUTES.ORDERS.route} element={<Orders />} />
					{/* АДМИНСТРАТОРСКАЯ */}
					<Route path={ROUTES.PRODUCT.route} element={<Product />} />
					<Route path={ROUTES.ORDER_LIST.route} element={<OrderList />} />
					<Route path={ROUTES.EXPENSE.route} element={<Expense />} />
					<Route path={ROUTES.WAREHOUSE.route} element={<Warehouse />} />
				</Route>
			</Routes>
			<Toaster />
		</>
	);
}

export default App;
