import type { SectionHeadingProps } from "@types";

export const SectionHeading = ({ text }: SectionHeadingProps) => {
	return <h3 className="text-2xl font-semibold"> {text} </h3>;
};
