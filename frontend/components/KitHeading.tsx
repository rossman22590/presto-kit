import React from "react";

type KitHeadingProps = {
	id: number;
	title: string;
};

const KitHeading: React.FC<KitHeadingProps> = ({ id, title }) => {
	return (
		<h2 className="font-Inter text-4xl font-bold">
			<span className="text-[#AEB4C1]"> {`0${id}`} </span> {title}
		</h2>
	);
};

export default KitHeading;
