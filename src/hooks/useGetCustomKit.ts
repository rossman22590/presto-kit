import { ColorsResponse, Kits, TypographyResponse } from "../types/Data";
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
	getKitsByCategory,
	getTypographyByKitId,
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
	const [typography, setTypography] = useState<TypographyResponse[] | null>(
		null
	);

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
				const colorData = await getColorsByKitId(kitId, supabase);
				setColors(colorData);

				const typographyData = await getTypographyByKitId(kitId, supabase);
				setTypography(typographyData);
				setIsLoadingKit(false);
			})();
		}
	}, [kitId]);

	const kit: CustomKit = {
		id: kitId,
		projectId,
		title: kitTitle,
		colors: sortColors(colors),
		display: getFontByCategory("DISPLAY", typography),
		text: getFontByCategory("TEXT", typography),
	};

	return { isLoadingKit, kit };
};
