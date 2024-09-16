import { FC } from 'react'
import AddNameToWarehouseForm from './form/AddNameToWarehouseForm';

interface AddNameToWarehouseProps {
  className?: string
}

const AddNameToWarehouse: FC<AddNameToWarehouseProps> = ({ className = `` }) => {
  return (
	<div className = {className}>
	 <AddNameToWarehouseForm/>
	</div>
  )
}

export default AddNameToWarehouse;