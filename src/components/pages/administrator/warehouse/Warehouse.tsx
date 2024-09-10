import { FC } from 'react'

interface WarehouseProps {
  className?: string
}

const Warehouse: FC<WarehouseProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Warehouse
    </div>
  )
}

export default Warehouse;