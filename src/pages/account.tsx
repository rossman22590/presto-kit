import { NextPage } from "next/types";
import { DashboardLayout, AccountSection } from "@components";
import { useSession } from "@supabase/auth-helpers-react";

const StarterKits: NextPage = ({}) => {
	const session = useSession();

	return (
		<DashboardLayout>
			{!session ? "Loading..." : <AccountSection session={session} />}
		</DashboardLayout>
	);
};

export default StarterKits;
