import { useRouter } from "next/router";
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import starterKitsType from "../types/starterKitsType";
import starterKitsShape from "../data/starterKitsShape";
import ColorSection from "./../components/ColorSection";
import TypographySection from "./../components/TypographySection";
import Layout from "../components/Layout";
import Container from "./../components/Container";
import KitHeading from "../components/KitHeading";
import DisplayText from "../components/DisplayText";

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

const StarterKits: NextPage<StarterKitsProps> = ({ formData }) => {
	const router = useRouter();
	const { name, industry } = router.query;
	const [starterKits, setStarterKits] =
		useState<starterKitsType>(starterKitsShape);
	const dataFetchedRef = useRef(false);

	useEffect(() => {
		const getInitialKit = async () => {
			if (dataFetchedRef.current) return;
			dataFetchedRef.current = true;

			let response = await fetch("http://localhost:8000/api/kits", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ brand: industry })
			});
			let data = await response.json();
			data.payload.id = 1;
			setStarterKits(data.payload);
		};
		getInitialKit();
	}, []);

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
				<Container gap="9rem" maxWidth="720px">
					{starterKits[2].typography.typefaces.text.weight === "" && (
						<Container gap="2rem" maxWidth="720px">
							<DisplayText
								heading="Generating Starter Kits"
								text="Thank you for your patience while our AI works hard to create a selection of brand kits for your brand."
							/>
							<img
								src="/loading-icon.png"
								alt="Loading Icon"
								className="h-20 w-20 animate-spin"
							/>
						</Container>
					)}
					{starterKits[2].typography.typefaces.text.weight !== "" && (
						<>
							<h1></h1>
							{starterKits.map((kit) => (
								<section className="flex w-full flex-col gap-16" key={kit.id}>
									<KitHeading id={kit.id} title={kit.title} />
									<ColorSection kit={kit} />
									<TypographySection kit={kit} />
								</section>
							))}
						</>
					)}
				</Container>
			</Layout>
		</>
	);
};

export default StarterKits;
