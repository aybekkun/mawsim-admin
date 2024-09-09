import { FC } from "react";
import cn from "classnames";
import styles from "./Header.module.scss";
import { MenuIcon } from "lucide-react";
import { useActiveMenu } from "@/store";
import {
	DropdownMenu,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
	DropdownMenuContent,
	DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouteName } from "@/hooks/useRouteName.hook";

interface HeaderProps {
	className?: string;
}

const Header: FC<HeaderProps> = ({ className = `` }) => {
	const { setActiveMenu } = useActiveMenu();
	const routeName = useRouteName();
	return (
		<header className={cn(styles.root, className)}>
			<div className="flex items-center gap-5">
				<button onClick={() => setActiveMenu(true)} className={styles.menu}>
					<MenuIcon />
				</button>
				<h2 className="text-xl font-bold text-slate-800">{routeName}</h2>
			</div>

			<div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
							A
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>Мой Аккаунт</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Настройки</DropdownMenuItem>
						<DropdownMenuItem>Поддержка</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>Выйти</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default Header;
