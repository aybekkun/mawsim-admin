import { FC } from 'react'

interface AcceptOrderProps {
  className?: string
}

const AcceptOrder: FC<AcceptOrderProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     AcceptOrder
    </div>
  )
}

export default AcceptOrder;