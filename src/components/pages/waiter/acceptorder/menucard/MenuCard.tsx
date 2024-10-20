import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TFood } from "@/services/types/global.types";
import { Minus, Plus } from "lucide-react";
import { FC, useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { useBasketStore } from "@/store/useBasketStore";
interface MenuCardProps {
	className?: string;
	food: TFood["food"];
	id: number;
	price: number;
}

const MenuCard: FC<MenuCardProps> = ({ food, id, price, className = `` }) => {
	const { stock, name, images } = food;
	const [stockAmout, setStockAmout] = useState(stock);
	useEffect(() => {
		setStockAmout(stock);
	}, [stock]);
	const { items, addItem, decreaseQuantity } = useBasketStore();
	const quantity = items.find((item) => item.id === id)?.quantity ?? 0;
	const isAvailable = stock > 0 && quantity < stock;
	const onAdd = ({ id, food, price }: { id: number; food: TFood["food"]; price: number }) => {
		if (quantity < stockAmout && stockAmout !== 0) {
			addItem({ id, food, price });
		}
	};

	return (
		<div className={"flex flex-col " + className}>
			<Card className={"relative flex flex-1 flex-col max-w-xs bg-white shadow-2xl rounded-2xl"}>
				<CardContent className="flex flex-col flex-1">
					<Carousel>
						<CarouselContent>
							{images.map(({ image_url }) => (
								<CarouselItem key={image_url}>
									<img
										src={image_url}
										width={200}
										height={200}
										className="mb-4 mt-4 block mx-auto  self-center object-cover w-28 aspect-square sm:w-32  lg:w-36  rounded-full "
										alt=""
									/>
								</CarouselItem>
							))}
							
						</CarouselContent>
					</Carousel>
					<h3 className="flex-1 text-xl font-extrabold">{name}</h3>
					<p className="text-orange-500 text-sm font-bold text-left">{Number(price).toLocaleString("Ru-ru")} сум</p>
				</CardContent>
				<Badge className="absolute -top-1 -right-1">{stockAmout - quantity}</Badge>
			</Card>
			<div className="flex justify-center items-center gap-4 mt-2">
				<Button
					disabled={stock === 0}
					onClick={() => decreaseQuantity(id)}
					className="bg-orange-500 hover:bg-orange-200 w-8 h-8"
					size={"icon"}
				>
					<Minus />
				</Button>
				<span className="font-bold">{quantity}</span>
				<Button
					disabled={!isAvailable}
					onClick={() => onAdd({ id, food, price })}
					className="bg-orange-500 hover:bg-orange-200 w-8 h-8"
					size={"icon"}
				>
					<Plus />
				</Button>
			</div>
		</div>
	);
};

export default MenuCard;
