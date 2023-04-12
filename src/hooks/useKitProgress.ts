import { useState, useEffect } from "react";
import { StarterKits } from "../types/StarterKits";
import { KITS_COUNT } from "../constants/global";

export const useKitProgress = (starterKits: StarterKits) => {
	const [progress, setprogress] = useState<number | undefined>(66);

	useEffect(() => {
		if (starterKits.length > 0 && starterKits.length < KITS_COUNT) {
			setprogress(66 + (starterKits.length / KITS_COUNT) * 34);
		} else if (starterKits.length === KITS_COUNT) {
			setprogress(undefined);
		}
	}, [starterKits, KITS_COUNT]);

	return progress;
};
