import { FC } from 'react'

interface SalaryProps {
  className?: string
}

const Salary: FC<SalaryProps> = ({ className = `` }) => {
  return (
    <div className = {className}>
     Salary
    </div>
  )
}

export default Salary;