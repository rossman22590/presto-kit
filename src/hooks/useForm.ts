import { useRouter } from "next/router";
import { useState } from "react";

type UseForm = (
	formId: string,
	route: string
) => {
	input: string;
	setInput: React.Dispatch<React.SetStateAction<string>>;
	handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const useForm: UseForm = (formId: string, route: string) => {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push({
			pathname: "/" + route,
			query:
				formId === "name"
					? { name: input }
					: { name: router.query.name, description: input },
		});
	};

	return { input, setInput, handleSubmit };
};
