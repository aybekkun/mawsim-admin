
import { FC } from "react";

interface HomeProps {
	className?: string;
}

const Home: FC<HomeProps> = ({ className = `` }) => {
	
	return (
		<div className={className}>
	
		</div>
	);
};

export default Home;
