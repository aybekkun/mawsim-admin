import React, { FC } from "react";

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { menuItems } from "@/constants/menuItems";
import { useAuthPersistStore } from "@/store";

interface Props {
	className?: string;
}

export const TopMenu: FC<Props> = ({ className = `` }) => {
	const { user } = useAuthPersistStore();
	console.log(menuItems);
	
	return (
		<div className={className}>
			<NavigationMenu>
				<NavigationMenuList className="flex gap-2 flex-wrap">
					{menuItems
						.filter((item) => item.role === user?.role.id)
						.map((menuItem) =>
							menuItem.items.map((item) =>
								item.children ? (
									<NavigationMenuItem key={item.text}>
										<NavigationMenuTrigger>{item.text}</NavigationMenuTrigger>
										<NavigationMenuContent>
											<ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
												{item.children?.map((item) => (
													<ListItem key={item.text} icon={item.icon as LucideIcon} link={item.link} title={item.text} />
												))}
											</ul>
										</NavigationMenuContent>
									</NavigationMenuItem>
								) : (
									<NavigationMenuItem key={item.text}>
										<Link
											className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
											to={item.link as string}
										>
											<NavigationMenuLink>{item.text}</NavigationMenuLink>
										</Link>
									</NavigationMenuItem>
								)
							)
						)}
				</NavigationMenuList>
			</NavigationMenu>
		</div>
	);
};

type ListItemProps = {
	icon: LucideIcon;
	link?: string;
	className?: string;
	title?: string;
};
const ListItem = ({ link = "", icon: Icon, className = "", title = "" }: ListItemProps) => {
	return (
		<li className={className}>
			<Link
				to={link}
				className={cn(
					"block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
					className
				)}
			>
				<NavigationMenuLink asChild>
					<div className="flex items-center gap-2 text-sm font-medium leading-none">
						<Icon width={16} height={16} />
						{title}
					</div>
				</NavigationMenuLink>
			</Link>
		</li>
	);
};
