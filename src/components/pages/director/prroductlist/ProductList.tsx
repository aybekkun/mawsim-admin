import { FC } from "react";
import Chart1 from "./charts/Chart1";

interface ProductListProps {
	className?: string;
}

const ProductList: FC<ProductListProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Chart1 />
		</div>
	);
};

export default ProductList;
