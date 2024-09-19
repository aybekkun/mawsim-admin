import { FC } from "react";
import cn from "classnames";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { useActiveMenu } from "@/store";
interface HeaderProps {
	className?: string;
}

const Header: FC<HeaderProps> = ({ className = `` }) => {
	const { active, setActiveMenu } = useActiveMenu();
	return (
		<header className={cn(className, `header`)}>
			<div>
				<button className="header__menu" onClick={() => setActiveMenu(!active)}>
					<AlignJustify />
				</button>
			</div>
			
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
		</header>
	);
};

export default Header;
