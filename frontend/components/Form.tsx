import React from "react";
import { FormData } from "../pages/_app";

type FormProps = {
	placeholder: string;
	buttonText: string;
	formDataKey: string;
	formData: FormData;
	setFormData: React.Dispatch<React.SetStateAction<FormData>>;
};

const Form: React.FC<FormProps> = ({
	placeholder,
	buttonText,
	formData,
	setFormData,
	formDataKey
}) => {
	return (
		<form className="mt-4 flex gap-5">
			<input
				type="text"
				placeholder={placeholder}
				onChange={(e) =>
					setFormData({ ...formData, [formDataKey]: e.target.value })
				}
				className="font-regular w-96 rounded-md bg-presto-input-bg pl-6 pr-6 pt-4 pb-4 font-Inter text-lg text-presto-grey"
			></input>
			<input
				type="submit"
				value={buttonText}
				className="font-regular rounded-md bg-presto-green pl-8 pr-8 pt-4 pb-4 font-Inter text-lg text-white"
			/>
		</form>
	);
};

export default Form;
