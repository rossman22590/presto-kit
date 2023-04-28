import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { useGetCustomKit } from "../hooks/useGetCustomKit";
import { useEffect, useState } from "react";
import { CustomKit } from "../types/Kits";
import type { NextPage } from "next/types";
import { mockCustomKit } from "../data/mockData";
import { DisplayText } from "../components/Headings/DisplayText";
import { ColorCard } from "../components/Cards/ColorCard";
import { ColorsResponse } from "../types/Data";

const KitEditor: NextPage = ({}) => {
	// const { isLoadingKit, kit } = useGetCustomKit();

	// const [customKit, setCustomKit] = useState<CustomKit | null>(null);

	// useEffect(() => {
	// 	setCustomKit(kit);
	// }, [isLoadingKit]);

	const isLoadingKit = false;
	const kit = mockCustomKit;

	const [customKit, setCustomKit] = useState<CustomKit | null>(kit);

	const [customColors, setCustomColors] = useState<ColorsResponse[] | null>(
		kit.colors
	);

	return (
		<DashboardLayout>
			{customColors && (
				<>
					<section className="m-auto flex max-w-5xl flex-col items-center gap-12 py-6">
						<DisplayText
							heading="Edit Kit Colors"
							text="You can select any of the color hex codes below to edit and try out different colors."
							type="DASHBOARD"
						/>
						<div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-0">
							{customColors?.map((_, i) => (
								<ColorCard
									customColors={customColors}
									setCustomColors={setCustomColors}
									key={i}
									i={i}
								/>
							))}
						</div>
					</section>
					<section className="m-auto mt-10 flex max-w-5xl flex-col items-center gap-12 py-6">
						<DisplayText
							heading="Edit Kit Fonts"
							text="You can select any of the color hex codes below to edit and try out different colors."
							type="DASHBOARD"
						/>
					</section>
				</>
			)}
			{isLoadingKit && (
				<section className="m-auto flex max-w-[720px] flex-grow flex-col items-center gap-4 pt-28 md:gap-8 md:pt-40 md:pb-20">
					<img
						src="/loading-icon.png"
						alt="Loading Icon"
						className="h-16 w-16 animate-spin"
					/>
				</section>
			)}
		</DashboardLayout>
	);
};

export default KitEditor;
