import { NextPage } from "next/types";
import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { AccountSection } from "../components/Sections/AccountSection";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const StarterKits: NextPage = ({}) => {
	const session = useSession();
	const supabase = useSupabaseClient();

	return (
		<DashboardLayout>
			{!session ? (
				<Auth
					supabaseClient={supabase}
					appearance={{ theme: ThemeSupa }}
					view="sign_in"
					providers={["facebook", "google", "twitter"]}
					socialLayout="horizontal"
					redirectTo="/account"
				/>
			) : (
				<AccountSection session={session} />
			)}
		</DashboardLayout>
	);
};

export default StarterKits;
