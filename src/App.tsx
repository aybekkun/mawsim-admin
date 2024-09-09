import MainLayout from "./components/layout/main/MainLayout";
import AcceptOrder from "./components/pages/acceptorder/AcceptOrder";
import Home from "./components/pages/home/Home";
import { Route, Routes } from "react-router-dom";
import { ROUTES } from "./constants/routes";
function App() {
	return (
		<Routes>
			<Route path="/" element={<MainLayout />}>
				<Route index element={<Home />} />
				<Route path={ROUTES.ACCEPT_ORDER} element={<AcceptOrder />} />
			</Route>
		</Routes>
	);
}

export default App;
