import { Button } from "@/components/ui/button";
import { FC } from "react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

const AddProductForm: FC = () => {

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>+</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Какой продукт добавить</DialogTitle>
					<DialogDescription>
<form action="">
	
</form>
                    </DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default AddProductForm;
