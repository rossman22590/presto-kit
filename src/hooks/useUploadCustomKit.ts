import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { uploadColors, uploadKit, uploadFonts } from "../utils/queries";
import { useEffect, useState } from "react";
import type { Kits, Projects } from "../types/Data";
import type { KitContent } from "../types/Kits";

export const useUploadCustomKit = (
	projectId: Projects["id"] | null,
	projectName: Projects["name"] | null,
	selectedKit: KitContent
) => {
	const supabase = useSupabaseClient();
	const user = useUser();
	const kitTitle = projectName + " Custom Kit";
	const { colors, displayFont, textFont } = selectedKit;

	const [isCustomKit, setIsCustomKit] = useState(false);
	const [kitId, setKitId] = useState<Kits["id"] | null>(null);

	useEffect(() => {
		if (isCustomKit) {
			(async () => {
				const data = await uploadKit(
					"CUSTOM",
					projectId,
					kitTitle,
					user,
					supabase
				);
				if (data && data.id) {
					setKitId(data.id);
				}
			})();
		}
	}, [projectId, isCustomKit]);

	useEffect(() => {
		if (kitId) {
			uploadFonts(kitId, displayFont, textFont, supabase);
			uploadColors(kitId, colors, supabase);
		}
	}, [kitId]);

	return setIsCustomKit;
};
