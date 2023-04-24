import { NextPage } from "next/types";
import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { AccountSection } from "../components/Sections/AccountSection";
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
