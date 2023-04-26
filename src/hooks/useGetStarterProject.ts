import type { User } from "@supabase/supabase-js";
import type { Projects } from "../types/Data";
import { useEffect, useState } from "react";
import {
	useSession,
	useSupabaseClient,
	useUser,
} from "@supabase/auth-helpers-react";

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

	const getProject = async (user: User | null) => {
		setIsLoadingProject(true);

		try {
			if (!user) throw new Error("No user at get project");

			let { data, error } = await supabase
				.from("projects")
				.select("id, name, description")
				.eq("user_id", user.id)
				.single();
			if (error) throw error;

			if (data) {
				setProjectId(data.id);
				setBrandName(data.name);
				setBrandDescription(data.description);
			}
		} catch (error) {
			alert("Error loading user data!");
			console.log(error);
		} finally {
			setIsLoadingProject(false);
		}
	};

	useEffect(() => {
		getProject(user);
	}, [session]);

	return { brandName, brandDescription, isLoadingProject, projectId };
};
