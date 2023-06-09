import type { AiKit, Projects } from "@types";
import { useState, useEffect, useRef } from "react";
import { KITS_COUNT } from "@constants";

export const useFetchKits = (
	projectName: Projects["name"] | undefined,
	projectDescription: Projects["description"] | undefined,
	isProjectLoaded: boolean
) => {
	// dataFetchedRef prevents 2x sequential fetches to OpenAI
	const dataFetchedRef = useRef(false);
	const [starterKits, setStarterKits] = useState<AiKit[]>([]);
	const [error, setError] = useState<Error | null>(null);
	const [isLoadingKits, setIsLoadingKits] = useState<boolean>(true);

	useEffect(() => {
		if (isProjectLoaded) getInitialKits();
	}, [isProjectLoaded]);

	const getInitialKits = async () => {
		try {
			if (!projectName) throw new Error("No project name at fetch kits");
			if (!projectDescription)
				throw new Error("No project description at fetch kits");

			if (dataFetchedRef.current) return;
			dataFetchedRef.current = true;

			let previousKitData: AiKit[] | [] = [];

			for (let i = 0; i < KITS_COUNT; i++) {
				let response = await fetch("http://localhost:8000/api/kits", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						projectName: projectName,
						projectDescription: projectDescription,
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
