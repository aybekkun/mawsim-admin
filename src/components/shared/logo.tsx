import { FC } from "react";
import logoSvg from "../../assets/logo.svg";
interface Props {
	className?: string;
}

export const Logo: FC<Props> = ({ className = `` }) => {
	return (
		<div className={className}>
			<div className="flex items-center gap-4">
				<img src={logoSvg} alt="Logo" width={35} height={35} />
				<div>
					<h1 className="text-2xl uppercase font-black">Mausim&nbsp;Kafe</h1>
					<p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
				</div>
			</div>
		</div>
	);
};
