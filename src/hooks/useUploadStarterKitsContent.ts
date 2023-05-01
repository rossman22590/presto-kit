import { uploadColors, uploadFonts } from "../utils/queries";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { KITS_COUNT } from "../constants/global";
import { useEffect } from "react";
import type { Kits } from "../types/Data";
import type { AiKit } from "../types/Kits";

export const useUploadStarterKitsContent = (
	kitIds: Kits["id"][] | [],
	starterKits: AiKit[]
) => {
	const supabase = useSupabaseClient();

	useEffect(() => {
		if (starterKits.length === KITS_COUNT && kitIds.length === KITS_COUNT) {
			starterKits.forEach((kit, index) => {
				const currentKitId = kitIds[index];
				const { colors, displayFont, textFont } = kit;

				uploadFonts(currentKitId, displayFont, textFont, supabase);
				uploadColors(currentKitId, colors, supabase);
			});
		}
	}, [starterKits, kitIds]);
};
