import { FC } from 'react'

interface AddProductProps {
  className?: string
}

const AddProduct: FC<AddProductProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     AddProduct
    </div>
  )
}

export default AddProduct;