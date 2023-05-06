import { KITS_COUNT } from "../constants/global";
import { useState, useEffect } from "react";
import type { AiKit } from "@types";

export const useKitProgress = (starterKits: AiKit[], prevProgress: number) => {
	const [progress, setprogress] = useState<number | undefined>(prevProgress);

	const remainingProgress = 100 - prevProgress;

	useEffect(() => {
		if (starterKits.length > 0 && starterKits.length < KITS_COUNT) {
			setprogress(
				prevProgress + (starterKits.length / KITS_COUNT) * remainingProgress
			);
		}

		if (starterKits.length === KITS_COUNT) {
			setprogress(undefined);
		}
	}, [starterKits]);

	return progress;
};
