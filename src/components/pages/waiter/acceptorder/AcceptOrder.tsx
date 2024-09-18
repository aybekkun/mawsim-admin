import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FC } from "react";
import MenuCard from "./menucard/MenuCard";

interface AcceptOrderProps {
	className?: string;
}

const AcceptOrder: FC<AcceptOrderProps> = ({ className = `` }) => {
	return (
		<div className={className}>
			<Tabs defaultValue="foods">
				<TabsList className="">
					<TabsTrigger value="foods">Еда</TabsTrigger>
					<TabsTrigger value="drinks">Напитки</TabsTrigger>
				</TabsList>
				<TabsContent value="foods">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
						<MenuCard title="Пицца" price={55000} quantity={3} />
						<MenuCard title="Сомса" price={4000} quantity={3} />
						<MenuCard title="Сомса большой" price={8000} quantity={3} />
						<MenuCard title="Сомса" price={4000} quantity={3} />
					</div>
				</TabsContent>
				<TabsContent value="drinks">
					<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-4">
						<MenuCard
							title="Кола 1.5л"
							price={12000}
							quantity={3}
							image="https://dostavo4ka.uz/upload-file/2021/07/01/6218/750x750-47406b39-e089-4c49-9d6b-a46c61407b5d.jpg"
						/>
						<MenuCard
							title="Фанта 1.5"
							price={12000}
							quantity={3}
							image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdCcYHW9BvH1t9_CyR9f-iX9SHf-ulEp9M_A&s"
						/>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default AcceptOrder;
