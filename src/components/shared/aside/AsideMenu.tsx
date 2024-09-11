import { FC, useRef } from "react";
import cn from "classnames";
import SubMenu from "../submenu/SubMenu";

import { menuItems } from "./menuItems";

import { Utensils } from "lucide-react";
import styles from "./Aside.module.scss";
import { useActiveMenu } from "@/store";

const AsideMenu: FC = () => {
	const ref = useRef<HTMLDivElement>(null);
	const { active, setActiveMenu } = useActiveMenu();
	return (
		<>
			<div ref={ref} className={cn(styles.root, { "translate-x-0": active })}>
				<div className={styles.top}>
					<Utensils color="white" width={40} height={40} />
					<h1>Mawsim Admin</h1>
				</div>
				<div className={styles.center}>
					<nav className={styles.menu}>
						<ul>
							{menuItems.map(({ title, items }, index) => (
								<li key={title + index}>
									<SubMenu title={title} items={items} />
								</li>
							))}
						</ul>
					</nav>
				</div>
			
			</div>
			{active && <div onClick={() => setActiveMenu(false)} className={styles.overlay}></div>}
		</>
	);
};

export default AsideMenu;
