import { FC } from 'react'

interface ExpenseProps {
  className?: string
}

const Expense: FC<ExpenseProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Expense
    </div>
  )
}

export default Expense;