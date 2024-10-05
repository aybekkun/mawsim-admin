import { FC } from "react";
import Chart1 from "./charts/Chart1";
import Chart2 from "./charts/Chart2";
import Chart3 from "./charts/Chart3";


const Finance: FC = () => {
	return (
		<div className={"grid gap-4"}>
			<Chart3 />
			<div className="flex gap-4 justify-between">
				<Chart1 />
				<Chart2 />
			</div>
		</div>
	);
};

export default Finance;
