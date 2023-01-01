import React from "react";

type SectionHeadingProps = {
	text: string;
};

const SectionHeading: React.FC<SectionHeadingProps> = ({ text }) => {
	return <h3 className="font-Inter text-2xl font-semibold"> {text} </h3>;
};

export default SectionHeading;
