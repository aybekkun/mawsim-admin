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
