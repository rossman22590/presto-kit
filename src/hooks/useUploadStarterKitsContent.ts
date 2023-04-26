import { uploadColors, uploadTypography } from "../utils/queries";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { KITS_COUNT } from "../constants/global";
import { useEffect } from "react";
import type { Kits } from "../types/Data";
import type { Kit } from "../types/Kits";

export const useUploadStarterKitsContent = (
	kitIds: Kits["id"][] | [],
	starterKits: Kit[]
) => {
	const supabase = useSupabaseClient();
	useEffect(() => {
		if (starterKits.length === KITS_COUNT && kitIds.length === KITS_COUNT) {
			starterKits.forEach((kit, index) => {
				const currentKitId = kitIds[index];
				const { display, text } = kit.typography.typefaces;
				const { colors } = kit;

				uploadTypography(currentKitId, display, text, supabase);
				uploadColors(currentKitId, colors, supabase);
			});
		}
	}, [starterKits, kitIds]);
};
