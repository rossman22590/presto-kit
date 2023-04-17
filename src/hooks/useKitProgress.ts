import { useState, useEffect } from "react";
import { StarterKits } from "../types/StarterKits";
import { KITS_COUNT } from "../constants/global";

export const useKitProgress = (
	starterKits: StarterKits,
	latestProgress: number
) => {
	const [progress, setprogress] = useState<number | undefined>(latestProgress);

	const remainingProgress = 100 - latestProgress;

	useEffect(() => {
		if (starterKits.length > 0 && starterKits.length < KITS_COUNT) {
			setprogress(
				latestProgress + (starterKits.length / KITS_COUNT) * remainingProgress
			);
		}

		if (starterKits.length === KITS_COUNT) {
			setprogress(undefined);
		}
	}, [starterKits]);

	return progress;
};
