import { FC } from "react";

interface Props {
	className?: string;
}
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { useAuthPersistStore } from "@/store";

export const ProfileButton: FC<Props> = () => {
	const { user, signOut } = useAuthPersistStore();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline" size="icon" className="overflow-hidden rounded-full">
					{user?.name ? user?.name[0] : "A"}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel> {user?.name ? user?.name : "A"}</DropdownMenuLabel>
				<DropdownMenuSeparator />

				{/* 	{user?.role_id === 1 && (
            <>
                <DropdownMenuItem asChild>
                    <Link to={"/settings"}>Настройки</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Link to={"/"}>Категорий</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </>
        )} */}

				<DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
					Выйти
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
