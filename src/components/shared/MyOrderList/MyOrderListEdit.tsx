import { FC } from 'react'

interface MyOrderListEditProps {
  className?: string
}

const MyOrderListEdit: FC<MyOrderListEditProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     MyOrderListEdit
    </div>
  )
}

export default MyOrderListEdit;