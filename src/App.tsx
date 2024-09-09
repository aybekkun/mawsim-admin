import MainLayout from "./components/layout/main/MainLayout";
import AcceptOrder from "./components/pages/waiter/acceptorder/AcceptOrder";
import Home from "./components/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Finance from "./components/pages/director/finance/Finance";
import Warehouse from "./components/pages/director/warehousestats/WarehouseStats";
import OrderStats from "./components/pages/director/orderstats/OrderStats";
import ProductList from "./components/pages/director/prroductlist/ProductList";
function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				{/* Страницы Дирекктор */}
				<Route path={ROUTES.FINANCE.route} element={<Finance />} />
				<Route path={ROUTES.WAREHOUSE_STATS.route} element={<Warehouse />} />
				<Route path={ROUTES.ORDER_STATS.route} element={<OrderStats />} />
				<Route path={ROUTES.PRODUCT_LIST.route} element={<ProductList />} />
				
				<Route path={ROUTES.ACCEPT_ORDER.route} element={<AcceptOrder />} />
			</Route>
		</Routes>
	);
}

export default App;
