import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import type { Kits, Projects } from "../types/Data";
import type { User } from "@supabase/supabase-js";
import type { Kit } from "../types/Kits";

export const useUploadStarterKits = (
	projectId: Projects["id"] | null,
	starterKits: Kit[]
) => {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [kitId, setKitId] = useState<Kits["id"][] | []>([]);

	const uploadKit = async (
		user: User | null,
		projectId: Projects["id"] | null,
		kit: Kit,
		category: Kits["category"]
	) => {
		try {
			if (!user) throw new Error("No user at upload kit");
			if (!projectId) throw new Error("No project ID at upload kit");

			const updates = {
				project_id: projectId,
				user_id: user.id,
				title: kit.title,
				category,
			};

			let { data, error } = await supabase
				.from("kits")
				.insert(updates)
				.select()
				.single();

			if (error) {
				throw error;
			}

			if (data && data.id) {
				setKitId((prevState) => [...prevState, (data as Kits).id]);
			}
		} catch (error) {
			alert("Error inserting the kit data!");
			console.log(error);
		}
	};

	useEffect(() => {
		if (starterKits.length > 0) {
			const latestKit = starterKits[starterKits.length - 1];
			uploadKit(user, projectId, latestKit, "STARTER");
		}
	}, [starterKits]);

	return kitId;
};
