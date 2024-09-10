import { FC } from 'react'

interface ProductProps {
  className?: string
}

const Product: FC<ProductProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Product
    </div>
  )
}

export default Product;