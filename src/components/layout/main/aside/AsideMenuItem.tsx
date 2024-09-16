import { FC } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { LucideIcon } from "lucide-react";

interface AsideMenuItemProps {
	title: string;
	items: {
		link: string;
		icon: LucideIcon;
		text: string;
	}[];
	className?: string;
}

const AsideMenuItem: FC<AsideMenuItemProps> = ({ title, items, className = `` }) => {
	return (
		<ul className={cn("aside__menu-item", className)}>
			<h3>{title}</h3>
			{items.map(({ link, icon: Icon, text }, index) => (
				<li key={index + title}>
					<NavLink className={({ isActive }) => (isActive ? "active" : "")} to={link}>
						<Icon className="w-5 h-5" /> {text}
					</NavLink>
				</li>
			))}
		</ul>
	);
};

export default AsideMenuItem;