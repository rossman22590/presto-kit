import { useEffect, useState } from "react";
import { DashboardLayout } from "../components/DashboardLayout/DashboardLayout";
import { useGetCustomKit } from "../hooks/useGetCustomKit";
import { CustomKit } from "../types/Kits";
import type { NextPage } from "next/types";

const KitEditor: NextPage = ({}) => {
	const { isLoadingKit, kit } = useGetCustomKit();

	const [customKit, setCustomKit] = useState<CustomKit | null>(null);

	useEffect(() => {
		setCustomKit(kit);
		console.log(customKit);
	}, [isLoadingKit]);

	return (
		<DashboardLayout>
			<p>Hello World</p>
		</DashboardLayout>
	);
};

export default KitEditor;
