import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { FC } from "react";

interface MenuCardProps {
	className?: string;
}

const MenuCard: FC<MenuCardProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<div className="p-2 bg-white shadow-xl rounded-lg ">
				<div className="mt-4 mb-1 flex justify-center">
					<img className="object-cover h-32 w-32 rounded-full sm:h-44 sm:w-44" src="https://via.placeholder.com/300x200" alt="" />
				</div>
				<h4 className="text-sm font-bold text-center sm:text-lg">Avacado and Egg Toast</h4>
				<div className="flex items-center justify-end">
					<span className="text-xs font-extrabold text-orange-400 sm:text-sm">25 000 sum</span>
				</div>
			</div>
			<div className="flex justify-center items-center gap-4 mt-2">
				<Button className="bg-orange-400 hover:bg-orange-200" size={"icon"}>
					<Minus />
				</Button>
				<span className="font-bold">3</span>
				<Button className="bg-orange-400 hover:bg-orange-200" size={"icon"}>
					<Plus />
				</Button>
			</div>
		</div>
	);
};

export default MenuCard;
