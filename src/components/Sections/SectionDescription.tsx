import type { SectionDescriptionProps } from "@types";

export const SectionDescription = ({ text }: SectionDescriptionProps) => {
	return (
		<p className="border-l-4 border-[#E8EDF4] pl-10 font-light leading-8 text-[#48505F]">
			{text}
		</p>
	);
};
