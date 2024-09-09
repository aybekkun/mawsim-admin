import { FC } from 'react'

interface WarehouseStatsProps {
  className?: string
}

const WarehouseStats: FC<WarehouseStatsProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Warehouse
    </div>
  )
}

export default WarehouseStats;