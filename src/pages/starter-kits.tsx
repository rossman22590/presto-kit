import type { StarterKits } from "../types/StarterKits";
import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import { starterKitsState } from "../states/starterKitsState";
import { ColorSection } from "../components/ColorSection";
import { TypographySection } from "../components/TypographySection";
import { Layout } from "../components/Layout";
import { KitHeading } from "../components/KitHeading";
import { DisplayText } from "../components/DisplayText";
import { useRouter } from "next/router";
import Head from "next/head";

const StarterKits: NextPage = ({}) => {
	const [starterKits, setStarterKits] = useState<StarterKits>(starterKitsState);

	const dataFetchedRef = useRef(false);

	const router = useRouter();

	let { name, industry } = router.query;
	name = Array.isArray(name) ? name[0] : name;

	const capitaliseWords = (str: string | undefined) => {
		return str?.replace(/\b[a-z]/gi, (char) => char.toUpperCase());
	};

	const brandName = capitaliseWords(name);

	useEffect(() => {
		const getInitialKit = async () => {
			if (dataFetchedRef.current) return;
			dataFetchedRef.current = true;

			let response = await fetch("http://localhost:8000/api/kits", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ brand: industry }),
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
				<section className="m-auto flex max-w-[720px] flex-col items-center gap-36 pb-56">
					{starterKits[2].typography.typefaces.text.weight === "" && (
						<section className="m-auto flex max-w-[720px] flex-col items-center gap-8 pb-56">
							<DisplayText
								heading="Generating Starter Kits"
								text="Thank you for your patience while our AI works hard to create a selection of starter kits for your brand."
							/>
							<img
								src="/loading-icon.png"
								alt="Loading Icon"
								className="h-20 w-20 animate-spin"
							/>
						</section>
					)}
					{starterKits[2].typography.typefaces.text.weight !== "" && (
						<>
							<h1></h1>
							{starterKits.map((kit) => (
								<section className="flex w-full flex-col gap-16" key={kit.id}>
									<KitHeading id={kit.id} title={kit.title} />
									<ColorSection kit={kit} />
									<TypographySection kit={kit} brandName={brandName} />
								</section>
							))}
						</>
					)}
				</section>
			</Layout>
		</>
	);
};

export default StarterKits;
