import React from "react";

type DisplayTextProps = {
	heading: string;
	text: string;
};

const DisplayText: React.FC<DisplayTextProps> = ({ heading, text }) => {
	return (
		<>
			<h1 className="mt-20 text-center font-Inter text-3xl font-semibold text-black">
				{heading}
			</h1>
			<p className="font-regular text-center font-Inter text-xl text-presto-grey">
				{text}
			</p>
		</>
	);
};

export default DisplayText;
