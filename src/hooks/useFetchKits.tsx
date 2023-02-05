import type { StarterKits } from "../types/StarterKits";
import { starterKitsState } from "../states/starterKitsState";
import { useState, useEffect, useRef } from "react";

export const useFetchKits = (brandDescription: string) => {
	// dataFetchedRef prevents 2x sequential fetches to OpenAI
	const dataFetchedRef = useRef(false);
	const [starterKits, setStarterKits] = useState<StarterKits>(starterKitsState);
	const [error, setError] = useState<Error | null>(null);

	useEffect(() => {
		const getInitialKits = async () => {
			try {
				if (dataFetchedRef.current) return;
				dataFetchedRef.current = true;

				let response = await fetch("http://localhost:8000/api/kits", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ brand: brandDescription }),
				});
				let data = await response.json();
				data.payload.id = 1;
				setStarterKits(data.payload);
			} catch (error) {
				console.error(error);
				setError(error as Error);
			}
		};
		getInitialKits();
	}, []);

	return { starterKits, error };
};
