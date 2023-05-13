import { SupabaseClient } from "@supabase/auth-helpers-react";
import type { ColorsResponse, Kits } from "../types/Data";

export const getColorsByKitsType = async (
	kitsType: Kits["type"],
	supabase: SupabaseClient
): Promise<ColorsResponse[] | null> => {
	try {
		let { data, error } = await supabase
			.from("kits")
			.select(`colors(type, name, hex)`)
			.eq("type", kitsType);

		if (error) throw error;

		if (data) {
			// Ensure data is flat array with non null values
			const flatData = data.flatMap((item) => {
				if (Array.isArray(item.colors)) {
					return item.colors.filter((color) => color !== null);
				} else {
					return item.colors !== null ? [item.colors] : [];
				}
			});

			return flatData;
		}
	} catch (error) {
		alert("Error loading color data!");
		console.log(error);
	}
	return null;
};
