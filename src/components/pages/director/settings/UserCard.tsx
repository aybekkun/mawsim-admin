import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDeleteUserMutation } from "@/services/auth/auth.api";
import { Edit2, Trash2 } from "lucide-react";
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
	const { mutate: deleteUser, isPending } = useDeleteUserMutation();
	const onDelete = async () => {
		if (window.confirm("Вы действительно хотите удалить пользователя?")) await deleteUser(user.id);
	};

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
					<div className="flex gap-4">
						<Button onClick={() => setEditId(user.id)} variant="outline">
							<Edit2 className="h-4 w-4 mr-2" /> Сбросить
						</Button>
						{user.role.id === 6 && (
							<Button disabled={isPending} onClick={onDelete} variant="destructive">
								<Trash2 className="h-4 w-4 mr-2" /> Удалить
							</Button>
						)}
					</div>
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
