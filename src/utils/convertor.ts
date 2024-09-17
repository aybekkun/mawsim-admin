export function getTotalPrice(str1: string, str2: string): number {
	return Number(str1.replace(/\s+/g, "")) * Number(str2.replace(/\s+/g, ""));
}
