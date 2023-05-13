import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { uploadColors, uploadFonts } from "@utils";
import { KITS_COUNT } from "../constants/global";
import { useEffect } from "react";
import type { Kits, AiKit } from "@types";

export const useUploadStarterKitsContent = (
	kitIds: Kits["id"][] | undefined,
	starterKits: AiKit[]
) => {
	const supabase = useSupabaseClient();

	useEffect(() => {
		if (
			starterKits.length === KITS_COUNT &&
			kitIds &&
			kitIds.length === KITS_COUNT
		) {
			starterKits.forEach((kit, index) => {
				const currentKitId = kitIds[index];
				const { colors, displayFont, textFont } = kit;

				uploadFonts(currentKitId, displayFont, textFont, supabase);
				uploadColors(currentKitId, colors, supabase);
			});
		}
	}, [starterKits, kitIds]);
};
