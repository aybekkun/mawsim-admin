import { FC } from "react";
import { Link } from "react-router-dom";
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
					<Link to={link}>
						<Icon /> {text}
					</Link>
				</li>
			))}
		</ul>
	);
};

export default SubMenu;
