import { useRouter } from "next/router";

export type InputProps = {
	name: string;
	value: string;
	labelText?: string;
	colorView?: string;
	placeholder?: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input = ({
	name,
	value,
	labelText,
	onChange,
	placeholder,
	colorView,
}: InputProps) => {
	return (
		<div>
			{labelText && (
				<label htmlFor={name} className="block leading-6 text-presto-grey">
					{labelText}
				</label>
			)}
			<div className="flex gap-4">
				{colorView && (
					<div
						className="aspect-square h-full"
						style={{ backgroundColor: "#000" }}
					></div>
				)}
				<input
					type="text"
					name="project-name"
					id={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					className="mt-3 block w-full rounded-md border-0 bg-presto-light-grey py-3 px-6 text-presto-grey focus:outline focus:outline-2 focus:outline-indigo-400 md:text-lg"
				/>
			</div>
		</div>
	);
};
