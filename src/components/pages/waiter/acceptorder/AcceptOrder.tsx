import { FC } from "react";
import cn from "classnames";
import MenuList from "./menulist/MenuList";

import SearchInput from "@/components/shared/search/SearchInput";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import styles from "./AcceptOrder.module.scss";

interface AcceptOrderProps {
	className?: string;
}

const AcceptOrder: FC<AcceptOrderProps> = ({ className = `` }) => {
	return (
		<div className={cn(styles.root, className)}>
			<SearchInput />
			<div className={styles.content}>
				<MenuList />
				<Card className={styles.right}>
					<CardHeader>
						<CardTitle>Заказ</CardTitle>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>
		</div>
	);
};

export default AcceptOrder;
