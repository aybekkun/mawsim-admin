import { FC, ReactNode } from "react";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";

interface MyDrawerProps {
	title?: string;
	open?: boolean;
	onOpenChange: (open: boolean) => void;
	children: ReactNode;
}
const MyDrawer: FC<MyDrawerProps> = ({ title = "", open = false, onOpenChange, children }) => {
	return (
		<Drawer open={open} onOpenChange={() => onOpenChange(!open)}>
			<DrawerContent>
				<DrawerHeader>
					<DrawerTitle>{title}</DrawerTitle>
                    <DrawerDescription>{title}</DrawerDescription>
				</DrawerHeader>
				<DrawerContent>{children}</DrawerContent>
			</DrawerContent>
		</Drawer>
	);
};

export default MyDrawer;
