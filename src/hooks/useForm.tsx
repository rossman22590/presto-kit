import { useState } from "react";
import { useRouter } from "next/router";

type UseForm = (
	formId: string,
	submitRoute: string
) => {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const useForm: UseForm = (formId: string, submitRoute: string) => {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push({
			pathname: "/" + submitRoute,
			query:
				formId === "name"
					? { name: input }
					: { name: router.query.name, description: input },
		});
	};

	return { input, setInput, handleSubmit };
};
