import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
type TUserProps = {
	user: {
		id: number;
		name: string;
		phone: string;
		role: {
			id: number;
			name: string;
		};
	};
	setEditId: (id: number) => void;
};
const UserCard = ({ user, setEditId }: TUserProps) => {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{user.name}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="space-y-2">
					<div className="flex justify-between">
						<span className="font-semibold">Должность:</span>
						<span>{user.role.name}</span>
					</div>
					<div className="flex justify-between">
						<span className="font-semibold">Телефон:</span>
						<span>{user.phone}</span>
					</div>
					<Button onClick={()=>setEditId(user.id)} variant="outline" className="">
						<Edit2 className="h-4 w-4 mr-2" /> Сбросить
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default UserCard;

{
	/* <div className="flex justify-between">
<Button type="submit">
    <Save className="h-4 w-4 mr-2" />
    Сохранить
</Button>
<Button onClick={() => setIsEdit(false)} variant={"destructive"}>
    <X className="h-4 w-4 mr-2" />
    Отмена
</Button>
</div> */
}
