import type { KitHeadingProps } from "@types";

export const KitHeading = ({ id, title }: KitHeadingProps) => {
	return (
		<h2 className="text-4xl font-bold">
			<span className="text-[#AEB4C1]"> {`0${id}`} </span> {title}
		</h2>
	);
};
