import { z } from "zod";
// export const addNameSchema = z.object({
// 	productName: z
// 		.string()
// 		.min(2, {
// 			message: "Минимум два символа",
// 		})
// 		.max(20, {
// 			message: "Максимум 20 символов",
// 		})
// 		.refine((val) => !/^\s/.test(val), { message: "Поле не должно начинаться с пробела" }),
// 	format_id: z.enum(["unit", "kg", "liter"]),
// });

export const formRawMaterialSchema = z.object({
	product_id: z.string(),
	quantity: z.string().refine(
		(val) => {
			const parsed = parseFloat(val);
			return !Number.isNaN(parsed) && parsed > 0;
		},
		{
			message: "Значение должно быть числом больше нуля",
		}
	),
	price: z.string().refine(
		(val) => {
			const parsed = parseFloat(val);
			return !Number.isNaN(parsed) && parsed > 0;
		},
		{
			message: "Значение должно быть числом больше нуля",
		}
	),
});

export const formFoodSchema = z.object({
	food_id: z.string(),
	quantity: z.string().refine(
		(val) => {
			const parsed = parseFloat(val);
			return !Number.isNaN(parsed) && parsed > 0;
		},
		{
			message: "Значение должно быть числом больше нуля",
		}
	),
	price: z.string().refine(
		(val) => {
			const parsed = parseFloat(val);
			return !Number.isNaN(parsed) && parsed > 0;
		},
		{
			message: "Значение должно быть числом больше нуля",
		}
	),
});

export const formRawNameSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Минимум два символа",
		})
		.max(50, {
			message: "Максимум 50 символов",
		}),

	format_id: z.enum(["1", "2", "3"]),
});

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const formFoodNameSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Минимум два символа",
		})
		.max(50, {
			message: "Максимум 50 символов",
		}),

	format_id: z.string(),
	category_id: z.string(),
	image: z.any(),
});
