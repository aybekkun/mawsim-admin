import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";
import { FC, useState } from "react";
import MyDialog from "../MyDialog/MyDialog";
import MyOrderList from "../MyOrderList/MyOrderList";

interface WatchOrdersProps {
	className?: string;
}

const WatchOrders: FC<WatchOrdersProps> = () => {
	const [open, setOpen] = useState(false);
	return (
		<>
			<Button onClick={() => setOpen(true)} size={"icon"}>
				<ClipboardList className="h-4 w-4" />
			</Button>
			<MyDialog open={open} onOpenChange={(open) => setOpen(open)}>
				<MyOrderList />
			</MyDialog>
		</>
	);
};

export default WatchOrders;
