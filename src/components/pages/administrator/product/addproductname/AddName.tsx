import { FC } from "react";
import AddNameForm from "./form/AddNameForm";
import AddNameList from "./AddNameList";

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
