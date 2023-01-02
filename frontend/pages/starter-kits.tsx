import { useRouter } from "next/router";
import type { NextPage } from "next";
import ColorSection from "./../components/ColorSection";
import TypographySection from "./../components/TypographySection";
import Layout from "../components/Layout";
import Container from "./../components/Container";
import KitHeading from "../components/KitHeading";

// ! Should not add stylesheets using next/head here
// this pattern is not recommended because it will potentially break when used with Suspense and/or streaming
// TODO -> try to import fonts dynamically another way
import Head from "next/head";

//? refactored form data to be captured through queries to prevent losing data (state) on manual page refresh
//? is formData state still useful ? - leaving it in place for now
import { FormData } from "./_app";

export type StarterKitsProps = {
	formData: FormData;
};

const starterKits = [
	{
		title: "Calm Serenity",
		id: 1,
		colors: {
			details: [
				{ id: 1, name: "Cloudy Sky", hex: "#F1F1F1" },
				{ id: 2, name: "Tranquil Teal", hex: "#00BFFF" },
				{ id: 3, name: "Sunshine Yellow", hex: "#FFD700" }
			],
			description:
				"This colour scheme is calming and serene, with a light and airy dominant colour. The tranquil teal adds a pop of colour and the sunshine yellow is used as a highlight to draw attention to important elements of the interface. This would be a good choice for a property website that wants to convey a sense of calm and peacefulness."
		},
		typography: {
			typefaces: {
				display: { font: "Public Sans", weight: "700" },
				text: { font: "Poppins", weight: "300" }
			},
			description:
				'For the display font, "Roboto" with a weight of 500 is a good choice. For text, "Open Sans" with a weight of 400 is suitable. Both fonts have a modern appearance and the chosen weights are legible and suitable for interface design. They also both have a friendly feel, which would complement the calming aesthetic of the "Tranquil" color scheme.'
		}
	},
	{
		title: "Playful Fun",
		id: 2,
		colors: {
			details: [
				{ id: 1, name: "Cotton Candy", hex: "#FFF5EE" },
				{ id: 2, name: "Crimson Red", hex: "#DC143C" },
				{ id: 3, name: "Mint Green", hex: "#008000" }
			],
			description:
				"This colour scheme is playful and fun, with a light and fluffy dominant colour. The crimson red adds depth and drama, while the mint green is used as a highlight to bring a sense of freshness and vitality. This would be a good choice for a property website that wants to convey a sense of excitement and energy."
		},
		typography: {
			typefaces: {
				display: { font: "Lobster", weight: "400" },
				text: { font: "Roboto", weight: "300" }
			},
			description:
				'For the display font, "Lobster" with a weight of 400 would be a suitable choice. For the text font, "Roboto" with a weight of 300 would be a good option. Both of these fonts have a fun and playful appearance, and the chosen weights are legible and suitable for use in interface design. They would complement the light and fluffy dominant color and the vibrant crimson and mint green accents of the "Playful" color scheme.'
		}
	},
	{
		title: "Classic Sophistication",
		id: 3,
		colors: {
			details: [
				{ id: 1, name: "Cornsilk", hex: "#FFF8DC" },
				{ id: 2, name: "Cadet Blue", hex: "#5F9EA0" },
				{ id: 3, name: "Orange Red", hex: "#FF4500" }
			],
			description:
				"This colour scheme is classic and sophisticated, with a neutral dominant colour. The cadet blue adds a touch of elegance and the orange red is used as a highlight to add a pop of boldness. This would be a good choice for a property website that wants to convey a sense of sophistication and refinement."
		},
		typography: {
			typefaces: {
				display: { font: "Playfair Display", weight: "700" },
				text: { font: "Roboto", weight: "400" }
			},
			description:
				'For the display font, "Playfair Display" with a weight of 700 would be a suitable choice. For the text font, "Roboto" with a weight of 400 would be a good option. Both of these fonts have a sophisticated and elegant appearance, and the chosen weights are legible and suitable for use in interface design. They would complement the neutral dominant color and the cadet blue and orange red accents of the "Classic Sophistication" color scheme.'
		}
	}
];
// const { kit1 } = starterKits;

const StarterKits: NextPage<StarterKitsProps> = ({ formData }) => {
	const router = useRouter();
	const { name, industry } = router.query;

	return (
		<>
			<Head>
				<link
					href={`https://fonts.googleapis.com/css2?family=${starterKits[0].typography.typefaces.display.font}:wght@${starterKits[0].typography.typefaces.display.weight}&display=swap`}
					rel="stylesheet"
				></link>
				<link
					href={`https://fonts.googleapis.com/css2?family=${starterKits[0].typography.typefaces.text.font}:wght@${starterKits[0].typography.typefaces.text.weight}&display=swap`}
					rel="stylesheet"
				></link>
				<link
					href={`https://fonts.googleapis.com/css2?family=${starterKits[1].typography.typefaces.display.font}:wght@${starterKits[1].typography.typefaces.display.weight}&display=swap`}
					rel="stylesheet"
				></link>
				<link
					href={`https://fonts.googleapis.com/css2?family=${starterKits[1].typography.typefaces.text.font}:wght@${starterKits[1].typography.typefaces.text.weight}&display=swap`}
					rel="stylesheet"
				></link>
				<link
					href={`https://fonts.googleapis.com/css2?family=${starterKits[2].typography.typefaces.display.font}:wght@${starterKits[2].typography.typefaces.display.weight}&display=swap`}
					rel="stylesheet"
				></link>
				<link
					href={`https://fonts.googleapis.com/css2?family=${starterKits[2].typography.typefaces.text.font}:wght@${starterKits[2].typography.typefaces.text.weight}&display=swap`}
					rel="stylesheet"
				></link>
			</Head>
			<Layout>
				<Container>
					<h1></h1>
					{starterKits.map((kit) => (
						<section className="flex w-full flex-col gap-16" key={kit.id}>
							<KitHeading id={kit.id} title={kit.title} />
							<ColorSection kit={kit} />
							<TypographySection kit={kit} />
						</section>
					))}
				</Container>
			</Layout>
		</>
	);
};

export default StarterKits;
