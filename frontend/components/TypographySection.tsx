import SectionDescription from "./SectionDescription";
import SectionHeading from "./SectionHeading";
import TypographyCard from "./TypographyCard";
import starterKitsType from "../types/starterKitsType";
import React from "react";

type TypographySectionProps = {
	kit: {
		title: string;
		id: number;
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
		typography: {
			typefaces: {
				display: { font: string; weight: string };
				text: { font: string; weight: string };
			};
			description: string;
		};
	};
};

const TypographySection: React.FC<TypographySectionProps> = ({ kit }) => {
	return (
		<section className="flex flex-col gap-12">
			<SectionHeading text="Typography" />
			<TypographyCard kit={kit} />
			<SectionDescription text={kit.typography.description} />
		</section>
	);
};

export default TypographySection;
