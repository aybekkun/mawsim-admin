import { FC } from "react";
import AddNameToWarehouseForm from "./form/AddNameToWarehouseForm";
import AddNameToWareHouseList from "./AddNameToWareHouseList";

interface AddNameToWarehouseProps {
	className?: string;
}

const AddNameToWarehouse: FC<AddNameToWarehouseProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<AddNameToWarehouseForm />
			<AddNameToWareHouseList />
		</div>
	);
};

export default AddNameToWarehouse;
