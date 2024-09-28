import { Button } from "@/components/ui/button";
import { FC, useState } from "react";
import AddRawMaterialForm from "./AddRawMaterialForm";
import AddRawMaterialTable from "./AddRawMaterialTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";

const AddRawMaterial: FC = () => {
	const [open, setOpen] = useState(false);

	return (
		<>
			<Card>
				<CardHeader>
					<CardTitle className="flex flex-wrap items-center justify-between">
						Список добавленных сырья <Button size={"icon"} onClick={() => setOpen(true)}><Plus /></Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<AddRawMaterialTable />
				</CardContent>
			</Card>
			<AddRawMaterialForm open={open} setOpen={setOpen} />
		</>
	);
};

export default AddRawMaterial;
