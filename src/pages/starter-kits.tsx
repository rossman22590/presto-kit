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
import type { StarterKits } from "../types/StarterKits";
import type { NextPage } from "next";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

const StarterKits: NextPage = ({}) => {
	const router = useRouter();
	const { brandName, brandDescription } = useRouterQuery(router);
	// const { starterKits, isLoading, error } = useFetchKits(
	// 	brandDescription,
	// 	brandName
	// );
	// useDynamicStylesheets(starterKits);

	const starterKits: StarterKits | [] = [
		{
			title: "",
			id: 1,
			colors: {
				details: [
					{
						id: 1,
						name: "",
						hex: "#F7EAD9",
					},
					{
						id: 2,
						name: "",
						hex: "#5F8A3F",
					},
					{
						id: 3,
						name: "",
						hex: "#F2B33D",
					},
				],
				description: "",
			},
			typography: {
				typefaces: {
					display: {
						font: "",
						weight: "",
					},
					text: {
						font: "",
						weight: "",
					},
				},
				description: "",
			},
		},
	];

	const isLoading = true;

	const error = null;

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

							<div className="flex gap-12">
								<div className="flex h-[62px] w-[164px] items-center justify-center rounded-md border-[1px] border-[#e1e4e6]">
									<div className="flex translate-x-[2px] items-center justify-center gap-[6px]">
										<div className="flex items-center justify-center gap-1">
											{starterKits[0].colors.details.map((color) => (
												<div
													className="h-6 w-6 rounded"
													style={{ backgroundColor: `${color.hex}` }}
												/>
											))}
										</div>
										<CheckCircleIcon className="h-10 w-10 stroke-presto-green stroke-[1.3px]" />
									</div>
								</div>

								<div className="flex h-[62px] w-[164px] items-center justify-center rounded-md border-2 border-presto-green">
									<div className="flex translate-x-[6px] items-center justify-center gap-3">
										<p className="text-xl font-medium text-presto-grey">
											Kit 2
										</p>
										<img
											src="/loading-icon.png"
											alt="Loading Icon"
											className="h-10 w-10 animate-spin"
										/>
									</div>
								</div>

								<div className="flex h-[62px] w-[164px] items-center justify-center rounded-md border-[1px] border-[#e1e4e6]">
									<p className="text-xl font-medium text-[#ccd7d9]">Kit 3</p>
								</div>
							</div>
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
