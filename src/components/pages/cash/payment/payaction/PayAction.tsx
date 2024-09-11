import { FC } from "react";

import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
interface PayActionProps {
	open: boolean;
	setOpen: () => void;
}

const PayAction: FC<PayActionProps> = ({ open, setOpen }) => {
	return (
		<Sheet open={open} onOpenChange={setOpen}>
			<SheetTrigger></SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Чек на оплату</SheetTitle>
					<SheetDescription>
						<div>
							<p className="text-center">Savdo cheki</p>
							<p className="font-bold text-center">Mawsim</p>
							<p className="font-bold text-center">22 kichikrayon, 134uy, 12xona</p>
							<hr />
							<table className="w-full mt-2">
								<tr className="border-y border-dashed">
									<th>Nomi</th>
									<th>Soni</th>
									<th>Narxi</th>
								</tr>
								<tr className="border-y border-dashed">
									<td>Coca-cola 0.5l</td>
									<td>2</td>
									<td>7500</td>
								</tr>

								<tr className="border-y border-dashed">
									<td>Сомса</td>
									<td>2</td>
									<td>7500</td>
								</tr>
							</table>
							<div className="flex justify-between items-center">
								<h4 className="text-lg font-bold">Jami tolov</h4> <span className="text-lg"> 15000</span>
							</div>
						</div>
						<div className="flex justify-end">
							<Button className="mt-4">Оплатить</Button>
						</div>
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default PayAction;
