import type { StarterKits } from "../types/Kits";
import { useState, useEffect, useRef } from "react";
import { KITS_COUNT } from "../constants/global";

import type { Database } from "../types/supabase";
type Projects = Database["public"]["Tables"]["projects"]["Row"];

export const useFetchKits = (
	brandName: Projects["name"] | null,
	brandDescription: Projects["description"] | null,
	isLoadingProject: boolean
) => {
	// dataFetchedRef prevents 2x sequential fetches to OpenAI
	const dataFetchedRef = useRef(false);
	const [starterKits, setStarterKits] = useState<StarterKits>([]);
	const [error, setError] = useState<Error | null>(null);
	const [isLoadingKits, setIsLoadingKits] = useState<boolean>(true);

	const sleep = (ms: number) =>
		new Promise((resolve) => setTimeout(resolve, ms));

	useEffect(() => {
		if (!isLoadingProject) getInitialKits();
	}, [isLoadingProject]);

	const getInitialKits = async () => {
		try {
			if (!brandName) throw new Error("No brand name at fetch kits");
			if (!brandDescription)
				throw new Error("No brand description at fetch kits");

			if (dataFetchedRef.current) return;
			dataFetchedRef.current = true;

			let previousKitData: StarterKits | [] = [];

			for (let i = 0; i < KITS_COUNT; i++) {
				let response = await fetch("http://localhost:8000/api/kits", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						brandName: brandName,
						brandDescription: brandDescription,
						previousKitData: previousKitData,
						id: i + 1,
					}),
				});
				let data = await response.json();
				previousKitData = [...previousKitData, ...data.payload];
				setStarterKits((prevStarterKits) => [
					...prevStarterKits,
					...data.payload,
				]);
			}

			setIsLoadingKits(false);
		} catch (error) {
			console.error(error);
			setError(error as Error);
			setIsLoadingKits(false);
		}
	};

	// useEffect(() => {
	// 	console.log("starterKits", starterKits);
	// }, [starterKits]);

	return { starterKits, isLoadingKits, error };
};
