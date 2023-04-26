import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import type { Kits, Projects } from "../types/Data";
import type { User } from "@supabase/supabase-js";
import type { Kit, SelectedKitView } from "../types/Kits";
import { uploadColors, uploadTypography } from "../utils/queries";

export const useUploadCustomKit = (
	projectId: Projects["id"] | null,
	projectName: Projects["name"],
	selectedKit: SelectedKitView
) => {
	const supabase = useSupabaseClient();
	const user = useUser();
	const kitTitle = projectName + " Custom Kit";
	const { colors } = selectedKit;
	const display = selectedKit.displayFont;
	const text = selectedKit.displayFont;

	const [kitId, setKitId] = useState<Kits["id"] | null>(null);

	const uploadKit = async (
		user: User | null,
		projectId: Projects["id"] | null,
		kitTitle: Kits["title"],
		category: Kits["category"]
	) => {
		try {
			if (!user) throw new Error("No user at upload kit");
			if (!projectId) throw new Error("No project ID at upload kit");

			const updates = {
				project_id: projectId,
				user_id: user.id,
				title: kitTitle,
				category,
			};

			let { data, error } = await supabase
				.from("kits")
				.insert(updates)
				.select()
				.single();
			if (error) throw error;

			if (data && data.id) {
				setKitId(data.id);
			}
		} catch (error) {
			alert("Error inserting the kit data!");
			console.log(error);
		}
	};

	if (projectId) {
		uploadKit(user, projectId, kitTitle, "CUSTOM");
	}

	useEffect(() => {
		if (kitId) {
			uploadTypography(kitId, display, text, supabase);
			uploadColors(kitId, colors, supabase);
		}
	}, [kitId]);
};
