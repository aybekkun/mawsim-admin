import { FC } from 'react';
import AddNameList from './AddNameList';
import AddNameForm from './form/AddNameForm';

interface AddNameProps {
    className?: string;
}

const AddName: FC<AddNameProps> = ({ className = `` }) => {
    return (
        <div className={className}>
            <AddNameForm />
            <AddNameList />
        </div>
    );
};

export default AddName;
