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

export const formRawMaterialExpenseSchema = z.object({
	product_id: z.number(),
	quantity: z.string().refine(
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

export const formMenuSchema = z.object({
	food_id: z.number(),
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

export const formUserSchema = z.object({
	name: z
		.string()
		.min(2, {
			message: "Минимум два символа",
		})
		.max(50, {
			message: "Максимум 50 символов",
		}),

	phone: z.string().regex(/^998\d{9}$/, {
		message: "Номер телефона должен начинаться с цифры 998 и сопровождаться 9 цифрами.",
	}),
	password: z
		.string()
		.min(2, {
			message: "Минимум два символа",
		})
		.max(50, {
			message: "Максимум 50 символов",
		}),
	role_id: z.any(),
});
