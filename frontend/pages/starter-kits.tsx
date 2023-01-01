import ColorSection from "./../components/ColorSection";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import Container from "./../components/Container";

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

				<ColorSection kit={kit1} />
			</Container>
		</Layout>
	);
};

export default StarterKits;
