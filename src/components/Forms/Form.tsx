import type { FormProps } from "@types";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useState } from "react";

export const Form = ({
	type,
	placeholder,
	buttonText,
	formId,
	route,
	heading,
	text,
	handleAuth,
}: FormProps) => {
	const router = useRouter();

	const [input, setInput] = useState("");

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (formId === "name") {
			router.push({
				pathname: "/" + route,
				query: { name: input },
			});
		}
		if (formId === "description" && handleAuth) {
			router.push({ query: { name: router.query.name, description: input } });
			handleAuth();
		}
	};

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
					className="rounded-md bg-presto-light-grey py-4 px-6 font-Inter text-base text-presto-grey focus:outline focus:outline-2 focus:outline-indigo-400 md:w-96 md:text-lg"
				></input>
				<input
					type="submit"
					value={buttonText}
					className="cursor-pointer rounded-md bg-presto-green py-4 px-8 font-Inter text-base text-white hover:opacity-90 focus:outline focus:outline-2 focus:outline-indigo-600 md:text-lg"
				/>
			</form>
		);
	}

	if (type === "ONBOARDING") {
		return (
			<form
				className="flex w-full flex-col gap-5 lg:gap-10"
				onSubmit={handleSubmit}
			>
				{/* 1024px is equal to max-w-5xl from onboarding <section> */}
				<div className="flex items-center justify-between gap-10 xl:w-[1024px]">
					<div className="flex flex-col gap-4">
						<h1 className="text-left font-Inter text-xl font-semibold text-black sm:text-2xl xl:text-3xl">
							{heading}
						</h1>
						<p className="text-left font-Inter font-light text-presto-grey lg:text-base xl:text-lg">
							{text}
						</p>
					</div>
					<button
						type="submit"
						className="hidden cursor-pointer items-center gap-2 rounded-md bg-presto-green py-4 px-8 font-Inter text-base text-white hover:opacity-90 focus:outline focus:outline-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-70 md:text-lg lg:flex"
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
					className="mt-4 rounded-md bg-presto-light-grey py-4 px-6 font-Inter text-base text-presto-grey focus:outline focus:outline-2 focus:outline-indigo-400 md:py-5 md:px-7 md:text-lg lg:mt-0"
					tabIndex={1}
				></input>
				<button
					type="submit"
					className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-presto-green py-4 px-8 font-Inter text-base text-white hover:opacity-90 focus:outline focus:outline-2 focus:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-70 md:text-lg lg:hidden"
					tabIndex={0}
					disabled={input.length === 0}
					aria-disabled={input.length === 0}
				>
					<p>{buttonText}</p>
					<ArrowRightIcon className="h-5 w-5" />
				</button>
			</form>
		);
	}

	return null;
};
