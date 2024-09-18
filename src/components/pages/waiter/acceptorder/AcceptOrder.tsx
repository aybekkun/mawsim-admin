import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FC } from "react";
import MenuCard from "./menucard/MenuCard";

interface AcceptOrderProps {
	className?: string;
}

const AcceptOrder: FC<AcceptOrderProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Tabs defaultValue="foods">
				<TabsList className="">
					<TabsTrigger value="foods">Еда</TabsTrigger>
					<TabsTrigger value="drinks">Напитки</TabsTrigger>
				</TabsList>
				<TabsContent value="foods">
					<div className="grid grid-cols-2 gap-4 ">
						<MenuCard />
						<MenuCard />
					</div>
				</TabsContent>
				<TabsContent value="drinks">еда</TabsContent>
			</Tabs>
		</div>
	);
};

export default AcceptOrder;
