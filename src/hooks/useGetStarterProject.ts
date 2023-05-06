import type { Projects } from "@types";
import { useEffect, useState } from "react";
import { getProjectsByUser } from "@utils";
import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";

export const useGetStarterProject = () => {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();

	const [isLoadingProject, setIsLoadingProject] = useState(true);
	const [projectId, setProjectId] = useState<Projects["id"] | null>(null);
	const [projectName, setProjectName] = useState<Projects["name"] | null>(null);
	const [projectDescription, setProjectDescription] = useState<
		Projects["description"] | null
	>(null);

	useEffect(() => {
		if (session) {
			(async () => {
				setIsLoadingProject(true);

				const data = await getProjectsByUser(user, supabase);

				if (data) {
					setProjectId(data[0].id);
					setProjectName(data[0].name);
					setProjectDescription(data[0].description);
				}
				setIsLoadingProject(false);
			})();
		}
	}, [session]);

	return { projectName, projectDescription, isLoadingProject, projectId };
};
