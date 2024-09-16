import { FC } from "react";

import AddToWarehouseList from "./AddToWarehouseList";

interface AddToWarehouseProps {
	className?: string;
}

const AddToWarehouse: FC<AddToWarehouseProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<AddToWarehouseList />
		</div>
	);
};

export default AddToWarehouse;
