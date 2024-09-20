import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, } from "lucide-react";
import { useState } from "react";
type TUserProps = {
	user: {
		id: number;
		name: string;
		phone: string;
		role_id: number;
		role: {
			id: number;
			name: string;
			created_at: Date;
			updated_at: Date;
		};
	};
};
const UserCard = ({ user }: TUserProps) => {
	const [isEdit, setIsEdit] = useState(false);
	console.log(isEdit);
    
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
						<div className="flex justify-between">
							<span className="font-semibold">Создан:</span>
							<span>{user.role.created_at.toString()}</span>
						</div>
						<div className="flex justify-between">
							<span className="font-semibold">Обновлен:</span>
							<span>{user.role.updated_at.toString()}</span>
						</div>
				
						
					
							<Button onClick={() => setIsEdit(true)} variant="outline" className="w-full">
								<Edit2 className="h-4 w-4 mr-2" />
								Редактировать
							</Button>
					
					</div>
				</CardContent>
			</Card>
	
	);
};

export default UserCard;

{/* <div className="flex justify-between">
<Button type="submit">
    <Save className="h-4 w-4 mr-2" />
    Сохранить
</Button>
<Button onClick={() => setIsEdit(false)} variant={"destructive"}>
    <X className="h-4 w-4 mr-2" />
    Отмена
</Button>
</div> */}