import { FC, useEffect } from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Pencil } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useUpdateFoodExpenseMutation } from "@/services/administrator/food/food.api";
interface Props {
	className?: string;
	values?: { id: number; expense_id: number; price: number; quantity: number };
}

const PopupEdit: FC<Props> = ({ values = { id: 0, price: 0, quantity: 0, expense_id: 0 }, className = `` }) => {
	const [open, setOpen] = useState(false);
	const [input1, setInput1] = useState(0);
	const [input2, setInput2] = useState(0);
	const { mutate, isPending } = useUpdateFoodExpenseMutation();
	useEffect(() => {
		setInput1(values.price);
		setInput2(values.quantity);
	}, [values]);
	const handleOK = async () => {
		if (window.confirm("Действительно хотите изменить данные?")) {
			mutate({ id: values.id, expense_id: values.expense_id, price: input1, quantity: input2 });
		}
		setOpen(false);
	};

	const handleCancel = () => {
		setInput1(0);
		setInput2(0);
		setOpen(false);
	};

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger>
				<Button onClick={() => setOpen(true)} variant="outline" size={"icon"}>
					<Pencil className="h-4 w-4" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-80">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Измените сумму и количество</h4>
					</div>
					<div className="grid gap-2">
						<Label>Общая сумма</Label>
						<Input
							id="number1"
							type="number"
							placeholder="Общая сумма"
							value={input1}
							min={0}
							onChange={(e) => setInput1(Number(e.target.value))}
						/>
						<Label>Количество</Label>
						<Input
							id="number2"
							type="number"
							placeholder="Количество"
							value={input2}
							min={0}
							onChange={(e) => setInput2(Number(e.target.value))}
						/>
					</div>
					<div className="flex justify-end space-x-2">
						<Button variant="outline" onClick={handleCancel}>
							Отменить
						</Button>
						<Button disabled={isPending} onClick={handleOK}>
							Изменить
						</Button>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default PopupEdit;
