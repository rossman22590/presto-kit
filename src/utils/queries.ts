import type { Kits, UploadColors, UploadTypefaces } from "../types/Data";
import type { Kit } from "../types/Kits";
import { SupabaseClient } from "@supabase/auth-helpers-react";
import { getColorCategory } from "./helpers";

export const uploadTypography = async (
	kitId: Kits["id"],
	kit: Kit,
	supabase: SupabaseClient
) => {
	try {
		const { display, text } = kit.typography.typefaces;

		const typefaceData: UploadTypefaces[] = [
			{
				category: "DISPLAY",
				font: display.font,
				weight: display.weight,
				kit_id: kitId,
			},
			{
				category: "TEXT",
				font: text.font,
				weight: text.weight,
				kit_id: kitId,
			},
		];

		const { error } = await supabase.from("typefaces").insert(typefaceData);

		if (error) throw error;
	} catch (error) {
		alert("Error inserting typography data!");
		console.log(error);
	}
};

export const uploadColors = async (
	kitId: Kits["id"],
	kit: Kit,
	supabase: SupabaseClient
) => {
	try {
		const colorData: UploadColors[] = kit.colors.details.map((color, i) => ({
			category: getColorCategory(i),
			name: color.name,
			hex: color.hex,
			kit_id: kitId,
		}));

		const { error } = await supabase.from("colors").insert(colorData);

		if (error) throw error;
	} catch (error) {
		alert("Error inserting colors data!");
		console.log(error);
	}
};
