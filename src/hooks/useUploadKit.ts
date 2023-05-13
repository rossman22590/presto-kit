import type { Kits, Projects, KitContent } from "@types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { uploadColors, uploadKit, uploadFonts } from "@utils";
import { useEffect, useState } from "react";

export const useUploadKit = (
	kitType: Kits["type"],
	projectId: Projects["id"] | undefined,
	kitTitle: string,
	selectedKit: KitContent
) => {
	const supabase = useSupabaseClient();
	const user = useUser();
	const { colors, displayFont, textFont } = selectedKit;

	const [isKitReady, setIsKitReady] = useState(false);
	const [kitId, setKitId] = useState<Kits["id"] | null>(null);

	useEffect(() => {
		if (isKitReady) {
			(async () => {
				const data = await uploadKit(
					kitType,
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
	}, [projectId, isKitReady]);

	useEffect(() => {
		if (kitId) {
			uploadFonts(kitId, displayFont, textFont, supabase);
			uploadColors(kitId, colors, supabase);
		}
	}, [kitId]);

	return setIsKitReady;
};
