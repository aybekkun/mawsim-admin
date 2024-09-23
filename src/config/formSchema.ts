import { z } from "zod";
export const addNameSchema = z.object({
	productName: z
		.string()
		.min(2, {
			message: "Минимум два символа",
		})
		.max(20, {
			message: "Максимум 20 символов",
		})
		.refine((val) => !/^\s/.test(val), { message: "Поле не должно начинаться с пробела" }),
	type: z.enum(["unit", "kg", "liter"]),
});



export const formRawMaterialSchema = z.object({
	productName: z
		.string()
		.min(2, {
			message: "Минимум два символа",
		})
		.max(50, {
			message: "Максимум 50 символов",
		}),
	quantity: z.string().refine(
		(val) => {
			const parsed = parseFloat(val);
			return !Number.isNaN(parsed) && parsed >= 0;
		},
		{
			message: "Значение должно быть числом больше или равным нуля",
		}
	),
	type: z.string(),
	price: z.string().refine(
		(val) => {
			const parsed = parseFloat(val);
			return !Number.isNaN(parsed) && parsed >= 0;
		},
		{
			message: "Значение должно быть числом больше или равным нуля",
		}
	),
});