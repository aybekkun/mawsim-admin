import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { FC } from "react";

interface MenuCardProps {
	className?: string;
	image?: string;
	title: string;
	price: number;
	quantity: number;
}

const MenuCard: FC<MenuCardProps> = ({
	title,
	price,
	quantity,
	image = "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2016/8/23/0/FNM_100116-Classic-Crust_s4x3.jpg.rend.hgtvcom.1280.720.suffix/1480972867043.webp",
	className = ``,
}) => {
	return (
		<div className={"flex flex-col "+className}>
			<Card className={"relative flex flex-1 flex-col max-w-xs bg-white shadow-2xl rounded-2xl"}>
				<CardContent className="flex flex-col flex-1">
					<img
						src={image}
						width={200}
						height={200}
						className="mb-4 mt-4 block mx-auto  self-center object-cover w-28 aspect-square sm:w-32  lg:w-36  rounded-full "
						alt=""
					/>
					<h3 className="flex-1 text-xl font-extrabold">{title}</h3>
					<p className="text-orange-500 text-sm font-bold text-left">{price.toLocaleString("Ru-ru")} сум</p>
				</CardContent>
				<Badge className="absolute -top-1 -right-1">{quantity}</Badge>
			</Card>
			<div className="flex justify-center items-center gap-4 mt-2">
				<Button className="bg-orange-500 hover:bg-orange-200 w-8 h-8" size={"icon"}>
					<Minus />
				</Button>
				<span className="font-bold">3</span>
				<Button className="bg-orange-500 hover:bg-orange-200 w-8 h-8" size={"icon"}>
					<Plus />
				</Button>
			</div>
		</div>
	);
};

export default MenuCard;
