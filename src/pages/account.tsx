import { DashboardLayout, AccountSection } from "@components";
import { secondaryNavigation, setCurrentPage } from "@utils";
import { useSession } from "@supabase/auth-helpers-react";
import type { NextPage } from "next/types";

const StarterKits: NextPage = ({}) => {
	setCurrentPage(secondaryNavigation, "Settings");

	const session = useSession();

	return (
		<DashboardLayout>
			{!session ? "Loading..." : <AccountSection session={session} />}
		</DashboardLayout>
	);
};

export default StarterKits;
