export function formatPhoneNumber(number: string) {
	return number.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "+$1 $2 $3-$4-$5");
}

export function unformatPhoneNumber(number: string) {
	const cleaned = number.replace(/\D/g, ""); // Remove non-digit characters
	if (cleaned.length !== 12) return "Invalid phone number";

	return `+998 (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
}
