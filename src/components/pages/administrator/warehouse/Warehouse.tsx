import { FC } from "react";
import AddNameToWarehouse from "./addwarehouse/AddNameToWarehouse";

interface WarehouseProps {
	className?: string;
}

const Warehouse: FC<WarehouseProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<AddNameToWarehouse />
		</div>
	);
};

export default Warehouse;
