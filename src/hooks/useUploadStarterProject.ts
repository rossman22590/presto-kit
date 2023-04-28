import { useRouterQuery } from "./useRouterQuery";
import { uploadProject } from "../utils/queries";
import { useRouter } from "next/router";
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
			const { brandName: name, brandDescription: description } =
				useRouterQuery(router);
			uploadProject(name, description, user, supabase);
			router.push("/starter-kits");
		}
	}, [session]);
};
