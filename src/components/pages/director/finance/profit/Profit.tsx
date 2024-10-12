import { FC } from 'react'

interface ProfitProps {
  className?: string
}

const Profit: FC<ProfitProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Profit
    </div>
  )
}

export default Profit;