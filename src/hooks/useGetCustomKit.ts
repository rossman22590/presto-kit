import { ColorsResponse, Kits, FontsResponse } from "../types/Data";
import { getFontByCategory, sortColors } from "../utils/helpers";
import { useEffect, useState } from "react";
import { CustomKit } from "../types/Kits";
import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";
import {
	getColorsByKitId,
	getFontsByKitId,
	getKitsByCategory,
} from "../utils/queries";

export const useGetCustomKit = () => {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();

	const [isLoadingKit, setIsLoadingKit] = useState(true);
	const [kitId, setKitId] = useState<Kits["id"] | null>(null);
	const [projectId, setProjectId] = useState<Kits["project_id"] | null>(null);
	const [kitTitle, setKitTitle] = useState<string | null>(null);
	const [colors, setColors] = useState<ColorsResponse[] | null>(null);
	const [fonts, setFonts] = useState<FontsResponse[] | null>(null);

	useEffect(() => {
		if (session) {
			(async () => {
				const data = await getKitsByCategory("CUSTOM", user, supabase);

				if (data) {
					setKitId(data[0].id);
					setProjectId(data[0].project_id);
					setKitTitle(data[0].title);
				}
			})();
		}
	}, [session]);

	useEffect(() => {
		if (kitId) {
			(async () => {
				const colorsData = await getColorsByKitId(kitId, supabase);
				setColors(colorsData);

				const fontsData = await getFontsByKitId(kitId, supabase);
				setFonts(fontsData);
				setIsLoadingKit(false);
			})();
		}
	}, [kitId]);

	const kit: CustomKit = {
		id: kitId,
		projectId,
		title: kitTitle,
		colors: sortColors(colors),
		displayFont: getFontByCategory("DISPLAY", fonts),
		textFont: getFontByCategory("TEXT", fonts),
	};

	return { isLoadingKit, kit };
};
