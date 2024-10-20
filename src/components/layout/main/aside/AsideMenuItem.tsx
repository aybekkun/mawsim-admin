import { FC, useState } from "react";
import { NavLink } from "react-router-dom";
import cn from "classnames";
import { useActiveMenu } from "@/store";
import { TMenuChild } from "../../../../constants/menuItems";
import { ChevronRight } from "lucide-react";

interface AsideMenuItemProps {
	title: string;
	items: TMenuChild[];
	className?: string;
}

const AsideMenuItem: FC<AsideMenuItemProps> = ({ title, items, className = `` }) => {
	const { setActiveMenu } = useActiveMenu();

	const [openIndex, setOpenIndex] = useState<number | null>(null);

	const toggle = (idx: number) => {
		setOpenIndex(openIndex === idx ? null : idx); // Переключение между открытием и закрытием
	};

	return (
		<ul className={cn("aside__menu-item", className)}>
			<h3>{title}</h3>
			{items.map(({ link, icon: Icon, text, children }, index) => (
				<li key={index + title}>
					{link ? (
						<NavLink
							onClick={() => setActiveMenu(false)}
							className={({ isActive }) => (isActive ? "active" : "")}
							to={link}
						>
							<Icon className="w-5 h-5" /> {text}
						</NavLink>
					) : (
						<div className="flex flex-col submenu">
							<button className="flex justify-between	items-center" onClick={() => toggle(index)}>
								<div className="flex gap-4 text-sm text-gray-500 p-2 rounded-lg items-center">
									<Icon className="w-5 h-5" /> {text}
								</div>
								<ChevronRight
									className={cn(
										"transition-all w-5 h-5 duration-300 overflow-hidden",
										openIndex === index ? "rotate-90" : "rotate-0"
									)}
								/>
							</button>
							<div
								className={cn(
									"transition-all duration-300 overflow-hidden",
									openIndex === index ? "max-h-96" : "max-h-0"
								)}
							>
								{children?.map(({ link = "", icon: Icon, text }, index) => (
									<NavLink
										key={text}
										onClick={() => setActiveMenu(false)}
										className={({ isActive }) => (isActive ? "active " : "pl-2")}
										to={link}
									>
										<Icon className="w-5 h-5" /> {text}
									</NavLink>
								))}
							</div>
						</div>
					)}
				</li>
			))}
		</ul>
	);
};

export default AsideMenuItem;
