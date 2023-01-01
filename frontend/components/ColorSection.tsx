import SectionDescription from "./SectionDescription";
import ColorCard from "./ColorCard";
import SectionHeading from "./SectionHeading";
import React from "react";

type ColorSectionProps = {
	kit: {
		title: string;
		id: number;
		colors: {
			details: { id: number; name: string; hex: string }[];
			description: string;
		};
	};
};

const ColorSection: React.FC<ColorSectionProps> = ({ kit }) => {
	return (
		<section className="flex flex-col gap-12">
			<SectionHeading text="Color Scheme" />
			<div className="flex justify-between ">
				{kit.colors.details.map((color) => (
					<ColorCard color={color} key={color.id} />
				))}
			</div>
			<SectionDescription text={kit.colors.description} />
		</section>
	);
};

export default ColorSection;
