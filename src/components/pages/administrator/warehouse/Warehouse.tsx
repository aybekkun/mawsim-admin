import { FC } from "react";
//import AddNameToWarehouse from "./addnamewarehouse/AddNameToWarehouse";
import AddToWarehouse from "./addtowarehouse/AddToWarehouse";

interface WarehouseProps {
	className?: string;
}

const Warehouse: FC<WarehouseProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<AddToWarehouse/>
			{/* <AddNameToWarehouse /> */}
		</div>
	);
};

export default Warehouse;
