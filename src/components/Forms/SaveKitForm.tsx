import { Button } from "../Buttons/Button";
import { useRouter } from "next/router";
import { useState } from "react";
import { Input } from "./Input";
import type { Color } from "@types";

export type SaveKitFormProps = {
	colors: Color[];
};

export const SaveKitForm = ({}) => {
	const router = useRouter();

	const [input, setInput] = useState("");

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(input);
		router.push("/export-kit");
	};

	type InputProps = {
		name: string;
		value: string;
		labelText?: string;
		colorView?: string;
		placeholder?: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};

	return (
		<form
			className="flex w-full flex-col gap-5 lg:gap-10"
			onSubmit={handleSubmit}
		>
			<Input
				name="project-name"
				value={input}
				labelText="Project Name"
				placeholder="Enter your project's name"
				onChange={(e) => setInput(e.target.value)}
			/>
			<Button text="Save Kit" withArrow />
		</form>
	);
};
