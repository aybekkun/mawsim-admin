import { FC } from "react";

interface ToLocaleProps {
	text: string;
}

const ToLocale: FC<ToLocaleProps> = ({ text = "" }) => {
	return <p className={"flex-nowrap"}>{Number(text).toLocaleString("ru-Ru")}</p>;
};

export default ToLocale;
