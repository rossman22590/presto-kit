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
		<form className="mt-4 flex gap-5" onSubmit={handleSubmit}>
			<input
				type="text"
				value={input}
				placeholder={placeholder}
				onChange={(e) => setInput(e.target.value)}
				className="font-regular w-[600px] rounded-md bg-presto-input-bg pl-6 pr-6 pt-4 pb-4 font-Inter text-lg text-presto-grey"
			></input>
			<input
				type="submit"
				value={buttonText}
				className="font-regular cursor-pointer rounded-md bg-presto-green pl-8 pr-8 pt-4 pb-4 font-Inter text-lg text-white hover:opacity-90"
			/>
		</form>
	);
};
