import React from "react";
import { useState, useEffect } from "react";
import { FormData } from "../pages/_app";
import { useRouter } from "next/router";

type FormProps = {
	placeholder: string;
	buttonText: string;
	formDataKey: string;
	submitRoute: string;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const Form: React.FC<FormProps> = ({
	placeholder,
	buttonText,
	formData,
	setFormData,
	formDataKey,
	submitRoute
}) => {
	const [input, setInput] = useState("");
	const router = useRouter();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setFormData({ ...formData, [formDataKey]: input });
		router.push("/" + submitRoute);
	};

	useEffect(() => {
		console.log(formData);
	}, [formData]);

	return (
		<form className="mt-4 flex gap-5" onSubmit={handleSubmit}>
			<input
				type="text"
				value={input}
				placeholder={placeholder}
				onChange={(e) => setInput(e.target.value)}
				className="font-regular w-96 rounded-md bg-presto-input-bg pl-6 pr-6 pt-4 pb-4 font-Inter text-lg text-presto-grey"
			></input>
			<input
				type="submit"
				value={buttonText}
				className="font-regular cursor-pointer rounded-md bg-presto-green pl-8 pr-8 pt-4 pb-4 font-Inter text-lg text-white hover:opacity-90"
			/>
		</form>
	);
};

export default Form;
