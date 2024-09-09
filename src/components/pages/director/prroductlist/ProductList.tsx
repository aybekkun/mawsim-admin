import { FC } from 'react'

interface ProductListProps {
  className?: string
}

const ProductList: FC<ProductListProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     ProductList
    </div>
  )
}

export default ProductList;