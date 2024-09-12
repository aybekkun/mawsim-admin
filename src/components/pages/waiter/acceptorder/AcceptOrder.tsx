import { FC } from "react";
import cn from "classnames";
import MenuList from "./menulist/MenuList";

import SearchInput from "@/components/shared/search/SearchInput";
import styles from "./AcceptOrder.module.scss";
import OrderList from "./orderlist/OrderList";

interface AcceptOrderProps {
	className?: string;
}

const AcceptOrder: FC<AcceptOrderProps> = ({ className = `` }) => {
	return (
		<div className={cn(styles.root, className)}>
			<SearchInput />
			<div className={styles.content}>
				<MenuList />
				<OrderList />
			</div>
		</div>
	);
};

export default AcceptOrder;
