import type { FormProps } from "../types/Props";
import { useForm } from "../hooks/useForm";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const Form = ({
	type,
	placeholder,
	buttonText,
	formId,
	submitRoute,
	heading,
	text,
}: FormProps) => {
	const { input, setInput, handleSubmit } = useForm(formId, submitRoute);

	if (type === "SIMPLE") {
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
	}

	if (type === "ONBOARDING") {
		return (
			<form className="flex w-full flex-col gap-10" onSubmit={handleSubmit}>
				{/* 1024px === max-w-5xl */}
				<div className="flex w-[1024px] items-center justify-between">
					<div className="flex flex-col gap-4">
						<h1 className="text-left font-Inter text-3xl font-semibold text-black">
							{heading}
						</h1>
						<p className="text-left font-Inter text-lg font-light text-presto-grey">
							{text}
						</p>
					</div>
					<button
						type="submit"
						className="font-regular flex cursor-pointer items-center gap-2 rounded-md bg-presto-green py-4 px-8 font-Inter text-base text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 md:text-lg"
						tabIndex={0}
						disabled={input.length === 0}
						aria-disabled={input.length === 0}
					>
						<p>{buttonText}</p>
						<ArrowRightIcon className="h-5 w-5" />
					</button>
				</div>

				<input
					type="text"
					value={input}
					placeholder={placeholder}
					onChange={(e) => setInput(e.target.value)}
					className="font-regular rounded-md bg-presto-light-grey py-5 px-7 font-Inter text-base text-presto-grey md:text-lg"
					tabIndex={1}
				></input>
			</form>
		);
	}

	return null;
};
