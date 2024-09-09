import MainLayout from "./components/layout/main/MainLayout";
import AcceptOrder from "./components/pages/waiter/acceptorder/AcceptOrder";
import Home from "./components/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
import Finance from "./components/pages/director/finance/Finance";
import Warehouse from "./components/pages/director/warehousestats/WarehouseStats";
function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				{/* Страницы Дирекктор */}
				<Route path={ROUTES.ACCEPT_ORDER} element={<AcceptOrder />} />
				<Route path={ROUTES.FINANCE} element={<Finance />} />
				<Route path={ROUTES.WAREHOUSE_STATS} element={<Warehouse />} />
			</Route>
		</Routes>
	);
}

export default App;
