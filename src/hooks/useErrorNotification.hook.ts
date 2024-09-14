import { useEffect } from "react";
import { useToast } from "./use-toast";

interface ErrorNotificationProps {
	isError: boolean;
	title: string;
	description: string;
}

function useErrorNotification({ isError, title, description }: ErrorNotificationProps) {
	const { toast } = useToast();

	useEffect(() => {
		if (isError) {
			toast({ title, description } );
		}
	}, [isError, title, description]); // Не забудь добавить зависимости
}

export default useErrorNotification;
