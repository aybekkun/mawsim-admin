import { FC } from "react";

import AddProductList from "./AddProductList";

interface AddProductProps {
	className?: string;
}

const AddProduct: FC<AddProductProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<AddProductList />
		</div>
	);
};

export default AddProduct;
