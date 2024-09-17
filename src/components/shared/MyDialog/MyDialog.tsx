import { FC, ReactNode } from "react";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface MyDialogProps {
	title?: string;
	open?: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}
const MyDialog: FC<MyDialogProps> = ({ title = "", open = false, onOpenChange, children }) => {
	return (
		<Dialog open={open} onOpenChange={() => onOpenChange(!open)}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription></DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default MyDialog;
