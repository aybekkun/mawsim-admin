import { FC } from 'react'

interface AddProductNameProps {
  className?: string
}

const AddProductName: FC<AddProductNameProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     AddProductName
    </div>
  )
}

export default AddProductName;