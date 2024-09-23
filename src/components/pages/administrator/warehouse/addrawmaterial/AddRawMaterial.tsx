import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import AddRawMaterialForm from "./AddRawMaterialForm";
import AddRawMaterialTable from "./AddRawMaterialTable";



const AddRawMaterial: FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Добавить сырье</Button>
			<AddRawMaterialForm open={open} setOpen={setOpen} />
			<AddRawMaterialTable className="mt-4"/>
		</>
	);
};

export default AddRawMaterial;
