import { Container } from "@/components/shared/container";
import { Logo } from "@/components/shared/logo";
import { ProfileButton } from "@/components/shared/profile-button";
import { TopMenu } from "@/components/shared/top-menu";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { FC } from "react";
import { Link } from "react-router-dom";

interface Props {
	className?: string;
}

export const Header: FC<Props> = ({ className = `` }) => {
	return (
		<header className={cn("border-b bg-white", className)}>
			<Container className="flex items-center justify-between py-4 flex-wrap">
				<Link to="/">
					<Logo />
				</Link>
				<div>
					<TopMenu />
				</div>
				<div>
					<ProfileButton />
				</div>
			</Container>
		</header>
	);
};
