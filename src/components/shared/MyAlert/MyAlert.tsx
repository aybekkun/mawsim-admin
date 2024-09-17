import { FC, ReactNode } from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface MyAlertProps {
	title?: string;
	open?: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}
const MyAlert: FC<MyAlertProps> = ({ title = "", open = false, onOpenChange, children }) => {
	return (
		<AlertDialog open={open} onOpenChange={() => onOpenChange(!open)}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{title}</AlertDialogTitle>
					<AlertDialogDescription>{children}</AlertDialogDescription>
				</AlertDialogHeader>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default MyAlert;
