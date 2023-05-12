import {
	useSupabaseClient,
	useSession,
	useUser,
} from "@supabase/auth-helpers-react";

export const useSupabase = () => {
	const supabase = useSupabaseClient();
	const session = useSession();
	const user = useUser();

	return { supabase, session, user };
};
