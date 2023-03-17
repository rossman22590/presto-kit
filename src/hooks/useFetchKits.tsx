import type { StarterKits } from "../types/StarterKits";
import { useState, useEffect, useRef } from "react";
import { KITS_COUNT } from "../constants/global";

export const useFetchKits = (brandDescription: string) => {
	// dataFetchedRef prevents 2x sequential fetches to OpenAI
	const dataFetchedRef = useRef(false);
	const [starterKits, setStarterKits] = useState<StarterKits>([]);
	const [error, setError] = useState<Error | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const getInitialKits = async () => {
			try {
				if (dataFetchedRef.current) return;
				dataFetchedRef.current = true;
				let previousKitData: StarterKits | [] = [];

				for (let i = 0; i < KITS_COUNT; i++) {
					let response = await fetch("http://localhost:8000/api/kits", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
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

				setIsLoading(false);
			} catch (error) {
				console.error(error);
				setError(error as Error);
				setIsLoading(false);
			}
		};
		getInitialKits();
	}, []);

	// useEffect(() => {
	// 	console.log("starterKits", starterKits);
	// }, [starterKits]);

	return { starterKits, isLoading, error };
};
