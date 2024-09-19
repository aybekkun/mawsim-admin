import { FC, useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import MyDialog from "@/components/shared/MyDialog/MyDialog";
import MyOrderList from "@/components/shared/MyOrderList/MyOrderList";
import SearchableSelect from "@/components/shared/SearchableSelect/SearchableSelect";

interface ShopCartProps {
	className?: string;
}

const ShopCart: FC<ShopCartProps> = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)} className="bg-orange-500 hover:bg-orange-200">
				<ShoppingCart /> Корзина
				<Badge className="ml-1">12</Badge>
			</Button>
			<MyDialog title="Корзина" open={open} onOpenChange={(open) => setOpen(open)}>
				<SearchableSelect setItem={() => {}}    items={[{id:1,label:"Стол 1",value:"Стол 1"}]}/>
				<MyOrderList />
				<Button>Заказать</Button>
			</MyDialog>
		</>
	);
};

export default ShopCart;
