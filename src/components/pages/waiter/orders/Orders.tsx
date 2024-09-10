import { FC } from 'react'

interface OrdersProps {
  className?: string
}

const Orders: FC<OrdersProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Orders
    </div>
  )
}

export default Orders;