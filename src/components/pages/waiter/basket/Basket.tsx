import { FC } from 'react'

interface BasketProps {
  className?: string
}

const Basket: FC<BasketProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Basket
    </div>
  )
}

export default Basket;