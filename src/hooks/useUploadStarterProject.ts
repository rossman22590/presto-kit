import type { Projects } from "../types/Data";
import { useRouterQuery } from "./useRouterQuery";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {
	useSupabaseClient,
	useSession,
	useUser,
	User,
} from "@supabase/auth-helpers-react";

export const useUploadStarterProject = () => {
	const supabase = useSupabaseClient();
	const session = useSession();
	const router = useRouter();
	const user = useUser();

	const uploadProject = async ({
		user,
		name,
		description,
	}: {
		user: User | null;
		name: Projects["name"];
		description: Projects["description"];
	}) => {
		try {
			if (!user) throw new Error("No user at upload project");

			const updates = {
				user_id: user.id,
				name,
				description,
			};

			let { error } = await supabase
				.from("projects")
				.insert(updates)
				.eq("user_id", user.id);

			if (error) throw error;
		} catch (error) {
			alert("Error inserting the data!");
			console.log(error);
		}
	};

	useEffect(() => {
		if (session) {
			const { brandName: name, brandDescription: description } =
				useRouterQuery(router);
			uploadProject({ user, name, description });
			router.push("/starter-kits");
		}
	}, [session]);
};
