import type { Projects } from "../types/Data";
import { useEffect, useState } from "react";
import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";
import { getProjectsByUser } from "../utils/queries";

export const useGetStarterProject = () => {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();

	const [brandName, setBrandName] = useState<Projects["name"] | null>(null);
	const [brandDescription, setBrandDescription] = useState<
		Projects["description"] | null
	>(null);
	const [isLoadingProject, setIsLoadingProject] = useState(true);
	const [projectId, setProjectId] = useState<Projects["id"] | null>(null);

	useEffect(() => {
		if (user) {
			(async () => {
				setIsLoadingProject(true);

				const data = await getProjectsByUser(user, supabase);

				if (data) {
					setProjectId(data[0].id);
					setBrandName(data[0].name);
					setBrandDescription(data[0].description);
				}
				setIsLoadingProject(false);
			})();
		}
	}, [session]);

	return { brandName, brandDescription, isLoadingProject, projectId };
};
