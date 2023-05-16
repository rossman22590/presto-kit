import { Button } from "../Buttons/Button";
import { useState } from "react";
import { useRouter } from "next/router";

export const SaveKitForm = ({}) => {
	const router = useRouter();

	const [input, setInput] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
		router.push("/export-kit");
	};

	return (
		<form
			className="flex w-full flex-col gap-5 lg:gap-10"
			onSubmit={handleSubmit}
		>
			<input
				type="text"
				value={input}
				placeholder="placeholder"
				onChange={(e) => setInput(e.target.value)}
				className="rounded-md bg-presto-light-grey py-4 px-6 font-Inter text-base text-presto-grey focus:outline focus:outline-2 focus:outline-indigo-400 md:text-lg"
			/>
			<Button text="Save Kit" withArrow />
		</form>
	);
};
