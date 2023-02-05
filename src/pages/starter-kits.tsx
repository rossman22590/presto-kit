import { useFetchKits } from "../hooks/useFetchKits";
import type { NextPage } from "next";
import { ColorSection } from "../components/ColorSection";
import { TypographySection } from "../components/TypographySection";
import { Layout } from "../components/Layout";
import { KitHeading } from "../components/KitHeading";
import { DisplayText } from "../components/DisplayText";
import { useRouterQuery } from "../hooks/useRouterQuery";
import { useRouter } from "next/router";
import Head from "next/head";

const StarterKits: NextPage = ({}) => {
	const router = useRouter();
	const { brandName, brandDescription } = useRouterQuery(router);
	const { starterKits, isLoading, error } = useFetchKits(brandDescription);

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
					{isLoading && !error ? (
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
					) : !isLoading && !error ? (
						<>
							{starterKits.map((kit) => (
								<section
									className=" mt-32 flex w-full flex-col gap-16"
									key={kit.id}
								>
									<KitHeading id={kit.id} title={kit.title} />
									<ColorSection kit={kit} />
									<TypographySection kit={kit} brandName={brandName} />
								</section>
							))}
						</>
					) : (
						<>
							<section className="m-auto flex max-w-[720px] flex-col items-center gap-8 pb-56">
								<DisplayText
									heading="Woops, something went wrong!"
									text="Occasionally the AI response is not valid but we are working to fix this."
								/>
								<button
									type="submit"
									onClick={() => router.push("/")}
									className="font-regular cursor-pointer rounded-md bg-presto-green pl-8 pr-8 pt-4 pb-4 font-Inter text-lg text-white hover:opacity-90"
								>
									Please try again
								</button>
							</section>
						</>
					)}
				</section>
			</Layout>
		</>
	);
};

export default StarterKits;
