import type { SectionHeadingProps } from "../../types/Props";

export const SectionHeading = ({ text }: SectionHeadingProps) => {
	return <h3 className="font-Inter text-2xl font-semibold"> {text} </h3>;
};
