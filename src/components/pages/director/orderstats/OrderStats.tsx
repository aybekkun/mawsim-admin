import { FC } from 'react'

interface OrderStatsProps {
  className?: string
}


const OrderStats: FC<OrderStatsProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     OrderStats
    </div>
  )
}

export default OrderStats;