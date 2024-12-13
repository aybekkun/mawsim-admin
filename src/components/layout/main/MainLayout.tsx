import { FC } from "react";
import { Outlet } from "react-router-dom";
import "./MainLayout.scss";
import { Header } from "./header/Header";
import { Container } from "@/components/shared/container";
import bg from "../../../assets/bg.png";
const MainLayout: FC = () => {
	return (
		<div>
			<main style={{ backgroundImage: `url(${bg})`, backgroundRepeat: "no-repeat",backgroundPosition: "center center" }} className="main min-h-screen">
				<Header />
				<Container className="mt-5 px-4">
					<Outlet />
				</Container>
			</main>
		</div>
	);
};

export default MainLayout;
