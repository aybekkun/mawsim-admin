import { FC, ReactNode } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MyDialogProps {
	title?: string;
	open?: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
	scroll?: boolean;
}
const MyDialog: FC<MyDialogProps> = ({ title = "", open = false, onOpenChange, children, scroll = false }) => {
	return (
		<Dialog  open={open} onOpenChange={() => onOpenChange(!open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				{scroll ? <ScrollArea className="h-[500px] pr-2">{children}</ScrollArea> : children}
			</DialogContent>
		</Dialog>
	);
};

export default MyDialog;
