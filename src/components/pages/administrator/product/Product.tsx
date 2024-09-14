import { FC } from "react";
import AddProductName from "./addproductname/AddProductName";

interface ProductProps {
	className?: string;
}

const Product: FC<ProductProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<AddProductName />
		</div>
	);
};

export default Product;
