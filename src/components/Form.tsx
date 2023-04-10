import type { FormProps } from "../types/Props";
import { useForm } from "../hooks/useForm";

export const Form = ({
	placeholder,
	buttonText,
	formId,
	submitRoute,
}: FormProps) => {
	const { input, setInput, handleSubmit } = useForm(formId, submitRoute);

	return (
		<form
			className="mt-4 flex w-full flex-col justify-center gap-5 md:flex-row"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				value={input}
				placeholder={placeholder}
				onChange={(e) => setInput(e.target.value)}
				className="font-regular rounded-md bg-presto-light-grey py-4 px-6 font-Inter text-base text-presto-grey md:w-96 md:text-lg"
			></input>
			<input
				type="submit"
				value={buttonText}
				className="font-regular cursor-pointer rounded-md bg-presto-green py-4 px-8 font-Inter text-base text-white hover:opacity-90 md:text-lg"
			/>
		</form>
	);
};
