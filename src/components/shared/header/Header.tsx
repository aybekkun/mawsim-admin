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

interface HeaderProps {
	className?: string;
}

const Header: FC<HeaderProps> = ({ className = `` }) => {
	const { setActiveMenu } = useActiveMenu();
	return (
		<header className={cn(styles.root, className)}>
			<div>
				<button onClick={() => setActiveMenu(true)} className={styles.menu}>
					<MenuIcon />
				</button>
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
