import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { uploadColors, uploadKit, uploadTypography } from "../utils/queries";
import { useEffect, useState } from "react";
import type { Kits, Projects } from "../types/Data";
import type { SelectedKitView } from "../types/Kits";

export const useUploadCustomKit = (
	projectId: Projects["id"] | null,
	projectName: Projects["name"] | null,
	selectedKit: SelectedKitView
) => {
	const supabase = useSupabaseClient();
	const user = useUser();
	const kitTitle = projectName + " Custom Kit";
	const { colors } = selectedKit;
	const display = selectedKit.displayFont;
	const text = selectedKit.displayFont;

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
			uploadTypography(kitId, display, text, supabase);
			uploadColors(kitId, colors, supabase);
		}
	}, [kitId]);

	return setIsCustomKit;
};
