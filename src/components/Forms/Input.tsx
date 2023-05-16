import type { InputProps } from "@types";

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
				<label htmlFor={name} className="mb-3 block leading-6 text-presto-grey">
					{labelText}
				</label>
			)}
			<div className="flex gap-3">
				{colorView && (
					<div
						className="aspect-square h-12 rounded-md"
						style={{ backgroundColor: colorView }}
					/>
				)}
				<input
					type="text"
					name="project-name"
					id={name}
					value={value}
					placeholder={placeholder}
					onChange={onChange}
					className="block h-12 w-full rounded-md border-0 bg-presto-light-grey px-5 text-black focus:outline focus:outline-2 focus:outline-indigo-400 md:text-lg"
				/>
			</div>
		</div>
	);
};
