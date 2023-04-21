import type { TypographySectionProps } from "../../types/Props";
import { SectionHeading } from "../Headings/SectionHeading";
import { SectionDescription } from "./SectionDescription";
import { TypographyCard } from "../Cards/TypographyCard";

export const TypographySection = ({
	kit,
	brandName,
}: TypographySectionProps) => {
	return (
		<section className="flex flex-col gap-12">
			<SectionHeading text="Typography" />
			{/* <TypographyCard kit={kit} brandName={brandName} /> */}
			{/* <SectionDescription text={kit.typography.description} /> */}
		</section>
	);
};
