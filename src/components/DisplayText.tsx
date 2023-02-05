import type { DisplayTextProps } from "../types/Props";

export const DisplayText = ({ heading, text }: DisplayTextProps) => {
	return (
		<>
			<h1 className="mt-20 text-center font-Inter text-3xl font-semibold text-black">
				{heading}
			</h1>
			<p className="text-center font-Inter text-xl font-normal text-presto-grey">
				{text}
			</p>
		</>
	);
};
