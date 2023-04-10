import { useDynamicStylesheets } from "../hooks/useDynamicStylesheets";
import { TypographySection } from "../components/TypographySection";
import { ColorSection } from "../components/ColorSection";
import { useRouterQuery } from "../hooks/useRouterQuery";
import { DisplayText } from "../components/DisplayText";
import { KitHeading } from "../components/KitHeading";
import { useFetchKits } from "../hooks/useFetchKits";
import { KITS_COUNT } from "../constants/global";
import { Layout } from "../components/Layout";
import { useRouter } from "next/router";
import type { NextPage } from "next";

const StarterKits: NextPage = ({}) => {
	const router = useRouter();
	const { brandName, brandDescription } = useRouterQuery(router);
	const { starterKits, isLoading, error } = useFetchKits(
		brandDescription,
		brandName
	);
	useDynamicStylesheets(starterKits);

	return (
		<>
			<Layout>
				<section className="m-auto flex max-w-[720px] flex-col items-center gap-20 pb-56">
					{isLoading && !error ? (
						<section className="m-auto flex max-w-[720px] flex-col items-center gap-8 pb-56">
							<DisplayText
								heading="Generating Starter Kits"
								text={`Thank you for your patience while our AI works hard to create a selection of starter kits for your brand. Currently generating kit ${
									starterKits.length + 1
								} of ${KITS_COUNT}`}
							/>
							<img
								src="/loading-icon.png"
								alt="Loading Icon"
								className="h-20 w-20 animate-spin"
							/>
						</section>
					) : !isLoading && starterKits.length > 0 ? (
						<>
							{starterKits.map((kit) => (
								<section
									className="mt-32 flex w-full flex-col gap-16"
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
