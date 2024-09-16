import { FC } from 'react'

interface PaymentProps {
  className?: string
}

const Payment: FC<PaymentProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Payment
    </div>
  )
}

export default Payment;