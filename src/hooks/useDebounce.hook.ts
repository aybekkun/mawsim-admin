import { useEffect, useState } from "react";

function useDebounce(delay?: number) {
	const [debouncedValue, setDebouncedValue] = useState("");

	useEffect(() => {
		const timer = setTimeout(() => setDebouncedValue(debouncedValue), delay || 500);

		return () => {
			clearTimeout(timer);
		};
	}, [debouncedValue, delay]);

	return { debouncedValue, setDebouncedValue };
}

export default useDebounce;
