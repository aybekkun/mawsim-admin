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
import { useActiveMenu, useAuthPersistStore } from "@/store";
import { Link } from "react-router-dom";
interface HeaderProps {
	className?: string;
}

const Header: FC<HeaderProps> = ({ className = `` }) => {
	const { user, signOut } = useAuthPersistStore();
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
						{user?.name ? user?.name[0] : "A"}
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuLabel> {user?.name ? user?.name : "A"}</DropdownMenuLabel>
					<DropdownMenuSeparator />

					{user?.role_id === 1 && (
						<>
							<DropdownMenuItem asChild>
								<Link to={"/settings"}>Настройки</Link>
							</DropdownMenuItem>
							<DropdownMenuItem asChild>
								<Link to={"/"}>Категорий</Link>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
						</>
					)}

					<DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
						Выйти
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</header>
	);
};

export default Header;
