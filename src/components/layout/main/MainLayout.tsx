import { FC} from "react";
import Aside from "./aside/Aside";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";

import "./MainLayout.scss";

const MainLayout: FC = () => {
	return (
		<div className="layout">
			<Aside />
			<main className="main">
				<Header />
				<div className="content">
					<Outlet />
				</div>
			</main>
		</div>
	);
};

export default MainLayout;
