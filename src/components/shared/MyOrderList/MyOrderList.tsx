export default function MyOrderList() {
	return (
		<table>
			<thead>
				<th className="text-left">№</th>
				<th className="text-left">Название</th>
				<th className="text-center w-[70px]">Количество</th>
				<th className="text-right">Цена</th>
			</thead>
			<tbody>
				<tr className="border-b">
					<td className="text-left">1</td>
					<td>Кола 1.5л</td>
					<td className="text-center w-[70px]">3</td>
					<td className="text-right">12000</td>
				</tr>
				<tr className="border-b">
					<td className="text-left">2</td>
					<td>Кола 1.5л as wqsade w</td>
					<td className="text-center w-[70px]">3</td>
					<td className="text-right">12000</td>
				</tr>
				<tr className="border-b">
					<td className="text-left">3</td>
					<td>Кола 1.5л</td>
					<td className="text-center w-[70px]">3</td>
					<td className="text-right">12000</td>
				</tr>
				<tr>
					<td colSpan={1}></td>
					<td className="text-right" colSpan={3}>
						<b>Итого:</b> 36000 + 10% = 39600
					</td>
				</tr>
			</tbody>
		</table>
	);
}
