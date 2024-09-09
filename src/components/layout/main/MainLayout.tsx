import AsideMenu from "@/components/shared/aside/AsideMenu";
import { FC } from "react";
import styles from "./MainLayout.module.scss";
import cn from "classnames";
import { Outlet } from "react-router-dom";
import Header from "@/components/shared/header/Header";

interface MainLayoutProps {
	className?: string;
}

const MainLayout: FC<MainLayoutProps> = ({ className = `` }) => {
	return (
		<div className={cn(styles.root, className)}>
			<AsideMenu />
			<div className={styles.main}>
				<Header className="w-full " />
				<div className={styles.content}>
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default MainLayout;
