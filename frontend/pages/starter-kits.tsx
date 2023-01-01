import { useRouter } from "next/router";
import type { NextPage } from "next";
import ColorSection from "./../components/ColorSection";
import TypographySection from "./../components/TypographySection";
import Layout from "../components/Layout";
import Container from "./../components/Container";
import KitHeading from "../components/KitHeading";

//? refactored form data to be captured through queries to prevent losing data (state) on manual page refresh
//? is formData state still useful ? - leaving it in place for now
import { FormData } from "./_app";

export type StarterKitsProps = {
	formData: FormData;
};

const starterKits = {
	kit1: {
		title: "Calm Serenity",
		id: 1,
		colors: {
			details: [
				{ id: 1, name: "Cloudy Sky", hex: "#EBF5FB" },
				{ id: 2, name: "Tranquil Teal", hex: "#00BFFF" },
				{ id: 3, name: "Sunshine Yellow", hex: "#FFD700" }
			],
			description:
				"This colour scheme is calming and serene, with a light and airy dominant colour. The tranquil teal adds a pop of colour and the sunshine yellow is used as a highlight to draw attention to important elements of the interface. This would be a good choice for a property website that wants to convey a sense of calm and peacefulness."
		},
		typography: {
			description:
				'For the display font, "Roboto" with a weight of 500 is a good choice. For text, "Open Sans" with a weight of 400 is suitable. Both fonts have a modern appearance and the chosen weights are legible and suitable for interface design. They also both have a friendly feel, which would complement the calming aesthetic of the "Tranquil" color scheme.'
		}
	}
};
const { kit1 } = starterKits;

const StarterKits: NextPage<StarterKitsProps> = ({ formData }) => {
	const router = useRouter();
	// const { name, industry } = formData;
	const { name, industry } = router.query;

	return (
		<Layout>
			<Container>
				<h1> {name} </h1>
				<h2> {industry} </h2>
				<section className="flex w-full flex-col gap-16">
					<KitHeading id={kit1.id} title={kit1.title} />
					<ColorSection kit={kit1} />
					<TypographySection kit={kit1} />
				</section>
			</Container>
		</Layout>
	);
};

export default StarterKits;
