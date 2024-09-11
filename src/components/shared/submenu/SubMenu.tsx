import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { LucideIcon } from "lucide-react";
import styles from "./SubMenu.module.scss";

interface SubmenuProps {
	title: string;
	items: {
		link: string;
		icon: LucideIcon;
		text: string;
	}[];
	className?: string;
}

const SubMenu: FC<SubmenuProps> = ({ title, items, className = `` }) => {
	return (
		<ul className={cn(styles.submenu, className)}>
			<h3>{title}</h3>
			{items.map(({ link, icon: Icon, text }, index) => (
				<li key={index + title}>
					<NavLink className={({ isActive }) => (isActive ? styles.active : "")} to={link}>
						<Icon /> {text}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default SubMenu;
