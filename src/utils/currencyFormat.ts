import { ControllerRenderProps } from "react-hook-form";

export const currencyFormat = (value: number | string) => value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
export const stringToNumber = (value: string): number | string => {
	return parseInt(value.replace(/ /g, ""), 10) || "";
};
export const convertToNumber = (value: string): number => {
	return parseInt(value.replace(/ /g, ""), 10);
};
export const handleAmountChange =
	(field: ControllerRenderProps<any, any>) => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value === "") {
			field.onChange("");
			return;
		}

		const valueAsNumber = stringToNumber(value);
		field.onChange(currencyFormat(valueAsNumber));
	};

export const formatToLocale = (number: string) => {
	return Number(number).toLocaleString("ru-Ru");
};
