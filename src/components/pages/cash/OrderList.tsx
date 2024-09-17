import { FC } from 'react'

interface OrderListProps {
  className?: string
}

const OrderList: FC<OrderListProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     OrderList
    </div>
  )
}

export default OrderList;