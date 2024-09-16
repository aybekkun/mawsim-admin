import { FC } from "react";
import logoSvg from "../../../../assets/logo.svg";
import { menuItems } from "./menuItems";
import AsideMenuItem from "./AsideMenuItem";
import { useActiveMenu } from "@/store";

import cn from "classnames";
import { ChevronLeft } from "lucide-react";
const Aside: FC = () => {
	const { active, setActiveMenu } = useActiveMenu();
	return (
		<>
			<aside className={cn("aside", { active: active })}>
				<div className="aside__top">
					<div className="flex gap-2 items-center">
						<img className="h-10" src={logoSvg} alt="" /> <h2>Mawsim</h2>
					</div>
					<button>
						<ChevronLeft onClick={() => setActiveMenu(false)} />
					</button>
				</div>
				<div className="aside__content">
					<nav>
						<ul>
							{menuItems.map(({ title, items }, index) => (
								<li key={title + index}>
									<AsideMenuItem title={title} items={items} />
								</li>
							))}
						</ul>
					</nav>
				</div>
			</aside>
			{active && <div onClick={() => setActiveMenu(false)} className="overlay"></div>}
		</>
	);
};

export default Aside;
