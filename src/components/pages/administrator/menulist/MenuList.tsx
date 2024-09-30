import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useState } from "react";
import MenuListTable from "./MenuListTable";

const MenuList = () => {
	const [open, setOpen] = useState(false);
  console.log(open);
  
	return (
		<Card>
			<CardHeader>
				<CardTitle className="flex flex-wrap items-center justify-between">
					Список меню
					<Button size={"icon"} onClick={() => setOpen(true)}>
						<Plus />
					</Button>
				</CardTitle>
			</CardHeader>
			<CardContent>
				<MenuListTable />
			</CardContent>
		</Card>
	);
};

export default MenuList;
