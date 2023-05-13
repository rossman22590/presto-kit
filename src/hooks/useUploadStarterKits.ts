import type { Kits, Projects, AiKit } from "@types";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { uploadKit } from "../utils/queries";
import { useEffect, useState } from "react";

export const useUploadStarterKits = (
	projectId: Projects["id"] | undefined,
	starterKits: AiKit[]
) => {
	const supabase = useSupabaseClient();
	const user = useUser();

	const [kitIds, setKitIds] = useState<Kits["id"][] | []>([]);

	useEffect(() => {
		if (starterKits.length > 0) {
			(async () => {
				const latestKitTitle = starterKits[starterKits.length - 1].title;

				const data = await uploadKit(
					"STARTER",
					projectId,
					latestKitTitle,
					user,
					supabase
				);

				if (data && data.id) {
					setKitIds((prevState) => [...prevState, (data as Kits).id]);
				}
			})();
		}
	}, [starterKits]);

	return kitIds;
};
