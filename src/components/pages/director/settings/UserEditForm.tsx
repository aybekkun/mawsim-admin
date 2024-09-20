import { Card } from '@/components/ui/card';
import { FC } from 'react'

interface UserEditFormProps {
  className?: string
}

const UserEditForm: FC<UserEditFormProps> = ({ className = `` }) => {
  return (
    <Card className = {className}>
     UserEditForm
    </Card>
  )
}

export default UserEditForm;