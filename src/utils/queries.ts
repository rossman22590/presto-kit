import { SupabaseClient, User } from "@supabase/auth-helpers-react";
import { getColorCategory } from "./helpers";
import type { Kit } from "../types/Kits";
import type {
	ColorsInsert,
	ColorsResponse,
	Kits,
	KitsResponse,
	TypefacesInsert,
	TypographyResponse,
} from "../types/Data";

export const getKitsByCategory = async (
	category: Kits["category"],
	user: User | null,
	supabase: SupabaseClient
): Promise<KitsResponse[] | null> => {
	try {
		if (!user) throw new Error("No user at get kit");

		let { data, error } = await supabase
			.from("kits")
			.select("id, project_id, title")
			.eq("user_id", user.id)
			.eq("category", category);

		if (error) throw error;

		return data;
	} catch (error) {
		alert("Error loading user data!");
		console.log(error);
	}
	return null;
};

export const getColorsByKitId = async (
	kitId: number | null,
	supabase: SupabaseClient
): Promise<ColorsResponse[] | null> => {
	try {
		if (!kitId) throw new Error("No kit id at get colors");

		let { data, error } = await supabase
			.from("colors")
			.select("category, name, hex")
			.eq("kit_id", kitId);

		if (error) throw error;

		return data;
	} catch (error) {
		alert("Error loading color data!");
		console.log(error);
	}
	return null;
};

export const getTypographyByKitId = async (
	kitId: number | null,
	supabase: SupabaseClient
): Promise<TypographyResponse[] | null> => {
	try {
		if (!kitId) throw new Error("No kit id at get typography");

		let { data, error } = await supabase
			.from("typefaces")
			.select("category, font, weight")
			.eq("kit_id", kitId);

		if (error) throw error;

		return data;
	} catch (error) {
		alert("Error loading typography data!");
		console.log(error);
	}
	return null;
};

export const uploadTypography = async (
	kitId: Kits["id"],
	display: Kit["typography"]["typefaces"]["display"],
	text: Kit["typography"]["typefaces"]["text"],
	supabase: SupabaseClient
) => {
	try {
		const typefaceData: TypefacesInsert[] = [
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
	colors: Kit["colors"],
	supabase: SupabaseClient
) => {
	try {
		const colorData: ColorsInsert[] = colors.details.map((color, i) => ({
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
