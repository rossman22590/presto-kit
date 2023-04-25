import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { KitViewSection } from "./../components/Sections/KitViewSection";
import { primaryNavigation, setCurrentPage } from "../utils/navigation";
import { useDynamicStylesheets } from "../hooks/useDynamicStylesheets";
import { KitProgressCard } from "../components/Cards/KitProgressCard";
import { KitPreviewCard } from "../components/Cards/KitPreviewCard";
import { useKitViewSelection } from "../hooks/useKitViewSelection";
import { DisplayText } from "../components/Headings/DisplayText";
import { Layout } from "../components/LandingLayout/Layout";
import { useKitProgress } from "../hooks/useKitProgress";
import { useFetchKits } from "../hooks/useFetchKits";
import { mockStarterKits } from "../data/mockData";
import { KITS_COUNT } from "../constants/global";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import type { Kit, StarterKits } from "../types/Kits";
import type { NextPage } from "next";
import {
	useSupabaseClient,
	useSession,
	useUser,
	User,
} from "@supabase/auth-helpers-react";

import type { Database } from "../types/supabase";
import { useGetStarterProject } from "../hooks/useGetStarterProject";
import { useUploadStarterKits } from "../hooks/useUploadStarterKits";
type Kits = Database["public"]["Tables"]["kits"]["Row"];
type Typefaces = Database["public"]["Tables"]["typefaces"]["Row"];
type Colors = Database["public"]["Tables"]["colors"]["Row"];
type UploadTypefaces = Omit<Typefaces, "id" | "inserted_at" | "updated_at">;
type UploadColors = Omit<Colors, "id" | "inserted_at" | "updated_at">;

const StarterKits: NextPage = ({}) => {
	setCurrentPage(primaryNavigation, "Starter Kits");
	const supabase = useSupabaseClient();
	const session = useSession();
	const router = useRouter();

	const prevProgress = 66;
	const latestProgress = 66;

	const { brandName, brandDescription, isLoadingProject, projectId } =
		useGetStarterProject();

	const { starterKits, isLoadingKits, error } = useFetchKits(
		brandDescription,
		brandName,
		isLoadingProject
	);

	const progress = useKitProgress(starterKits, latestProgress);

	const kitId = useUploadStarterKits(projectId, starterKits);

	// TODO: uploadTypography.ts query util

	const uploadTypography = async (kitId: Kits["id"], kit: Kit) => {
		try {
			const { display, text } = kit.typography.typefaces;

			const typefaceData: UploadTypefaces[] = [
				{
					category: "DISPLAY",
					font: display.font,
					weight: display.weight,
					kit_id: kitId,
				},
				{
					category: "TEXT",
					font: text.font,
					weight: text.weight,
					kit_id: kitId,
				},
			];

			const { error } = await supabase.from("typefaces").insert(typefaceData);

			if (error) {
				throw error;
			}
		} catch (error) {
			alert("Error inserting typography data!");
			console.log(error);
		}
	};

	// TODO: getColorCategory.ts helper

	const getColorCategory = (index: number) => {
		switch (index) {
			case 0:
				return "BASE";
			case 1:
				return "PRIMARY";
			case 2:
				return "ACCENT";
			default:
				throw new Error("Invalid index for color category");
		}
	};

	// TODO: uploadColors.ts query util

	const uploadColors = async (kitId: Kits["id"], kit: Kit) => {
		try {
			const colorData: UploadColors[] = kit.colors.details.map((color, i) => ({
				category: getColorCategory(i),
				name: color.name,
				hex: color.hex,
				kit_id: kitId,
			}));

			const { error } = await supabase.from("colors").insert(colorData);

			if (error) {
				throw error;
			}
		} catch (error) {
			alert("Error inserting colors data!");
			console.log(error);
		}
	};

	// TODO: useUploadStarterKitContent.ts hook

	useEffect(() => {
		if (starterKits.length === KITS_COUNT && kitId.length === KITS_COUNT) {
			starterKits.forEach((kit, index) => {
				const currentKitId = kitId[index];

				uploadTypography(currentKitId, kit);
				uploadColors(currentKitId, kit);
			});
		}
	}, [starterKits, kitId]);

	// Mock data
	// const brandName = "Farm Shop";
	// const brandDescription = "Organic Farm Store";
	// const starterKits = mockStarterKits;
	// const isLoading = false;
	// const error = null;

	const kitViewSelection = useKitViewSelection(starterKits);
	const { isKitView, selectedKitView } = kitViewSelection;

	useDynamicStylesheets(starterKits);

	useEffect(() => {
		if (session) {
			console.log("Session is active ->", session);
		}
	}, [session]);

	return (
		<>
			{isLoadingProject && (
				<Layout>
					<section className="m-auto flex max-w-[720px] flex-grow flex-col items-center gap-4 pt-28 md:gap-8 md:pt-40 md:pb-20">
						<img
							src="/loading-icon.png"
							alt="Loading Icon"
							className="h-16 w-16 animate-spin"
						/>
					</section>
				</Layout>
			)}
			{isLoadingKits && !error ? (
				<Layout prevProgress={prevProgress} progress={progress}>
					{/* <Layout> */}
					<section className="m-auto flex max-w-[720px] flex-grow flex-col items-center gap-4 pt-28 md:gap-8 md:pt-40 md:pb-20">
						<DisplayText
							heading="Generating Starter Kits"
							text={`Thank you for your patience while our AI works hard to create a selection of starter kits for your brand. Currently generating kit ${
								starterKits.length + 1
							} of ${KITS_COUNT}`}
							type="MAIN"
						/>
						<div className="mt-6 flex flex-col gap-8 md:flex-row md:gap-12">
							{Array(KITS_COUNT)
								.fill(0)
								.map((_, index) => {
									const kitNumber = index + 1;
									const isGenerating = kitNumber === starterKits.length + 1;
									const isComplete = kitNumber <= starterKits.length;
									return (
										<KitProgressCard
											key={kitNumber}
											starterKits={starterKits}
											kitNumber={kitNumber}
											isGenerating={isGenerating}
											isComplete={isComplete}
										/>
									);
								})}
						</div>
					</section>
				</Layout>
			) : !isLoadingKits && starterKits.length > 0 ? (
				<DashboardLayout>
					<section className="m-auto flex max-w-5xl flex-col items-center gap-12 py-6">
						<DisplayText
							heading={`Your ${brandName} starter kits are ready ✨`}
							text="You can select any of the kits, colors and fonts below to see
								how they look in the Kit View section."
							type="DASHBOARD"
						/>
						<div className="flex w-full flex-col items-center justify-between gap-12 lg:flex-row lg:items-start lg:gap-0">
							{starterKits.map((starterKit, i) => (
								<KitPreviewCard
									starterKit={starterKit}
									kitViewSelection={kitViewSelection}
									key={i}
									i={i}
								/>
							))}
						</div>
					</section>
					{isKitView() && brandName && brandDescription && (
						<KitViewSection
							selectedKitView={selectedKitView}
							brandName={brandName}
							brandDescription={brandDescription}
							route="kit-editor"
						/>
					)}

					<div className="h-20"></div>
				</DashboardLayout>
			) : (
				<Layout>
					<section className="m-auto flex max-w-[720px] flex-col items-center gap-20 pb-56">
						<div className="m-auto flex flex-col items-center gap-8 pb-56">
							<DisplayText
								heading="Woops, something went wrong!"
								text="Occasionally the AI response is not valid but we are working to fix this."
								type="MAIN"
							/>
							<button
								type="submit"
								onClick={() => router.push("/")}
								className="font-regular cursor-pointer rounded-md bg-presto-green pl-8 pr-8 pt-4 pb-4 font-Inter text-lg text-white hover:opacity-90"
							>
								Please try again
							</button>
						</div>
					</section>
				</Layout>
			)}
		</>
	);
};

export default StarterKits;
