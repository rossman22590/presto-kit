import SectionDescription from "./SectionDescription";
import SectionHeading from "./SectionHeading";
import React from "react";

type TypographySectionProps = {
	kit: {
		title: string;
		id: number;
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
		typography: { description: string };
	};
};

const TypographySection: React.FC<TypographySectionProps> = ({ kit }) => {
	return (
		<section className="flex flex-col gap-12">
			<SectionHeading text="Typography" />
			<SectionDescription text={kit.typography.description} />
		</section>
	);
};

export default TypographySection;
