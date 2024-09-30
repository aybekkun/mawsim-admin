import { useState, ChangeEvent } from "react";

export function useHandleFiles() {
	const [files, setFiles] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			if (files.length + newFiles.length > 3) {
				return;
			}
			setFiles((prevFiles) => [...prevFiles, ...newFiles]);
			const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
			setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
		}
	};

	const resetFiles = () => {
		setFiles([]);
		setPreviews([]);
	};

	return {
		files,
		previews,
		handleFileChange,
		resetFiles,
	};
}
