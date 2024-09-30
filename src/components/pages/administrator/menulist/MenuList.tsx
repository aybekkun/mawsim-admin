import { FC } from 'react'

interface MenuListProps {
  className?: string
}

const MenuList: FC<MenuListProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     OrderList
    </div>
  )
}

export default MenuList;