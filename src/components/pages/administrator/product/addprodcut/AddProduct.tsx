import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FC } from "react";
import AddProductForm from "./form/AddProductForm";

interface AddProductProps {
	className?: string;
}

const AddProduct: FC<AddProductProps> = ({ className = `` }) => {
	

	return (
		<div className={className}>
			<Card>
				<CardHeader>
					<CardTitle>
						<span>Добавить продукт (расходы) </span>
						<AddProductForm />
					</CardTitle>
				</CardHeader>
				<CardContent>

				</CardContent>
			</Card>
		</div>
	);
};

export default AddProduct;
