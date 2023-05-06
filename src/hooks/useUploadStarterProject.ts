import { useRouterQuery } from "./useRouterQuery";
import { useRouter } from "next/router";
import { uploadProject } from "@utils";
import { useEffect } from "react";
import {
	useSupabaseClient,
	useSession,
	useUser,
} from "@supabase/auth-helpers-react";

export const useUploadStarterProject = () => {
	const supabase = useSupabaseClient();
	const session = useSession();
	const router = useRouter();
	const user = useUser();

	useEffect(() => {
		if (session) {
			const { projectName: name, projectDescription: description } =
				useRouterQuery(router);
			uploadProject(name, description, user, supabase);
			router.push("/starter-kits");
		}
	}, [session]);
};
