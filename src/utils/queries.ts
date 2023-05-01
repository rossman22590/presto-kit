import { SupabaseClient, User } from "@supabase/auth-helpers-react";
import { getColorCategory } from "./helpers";
import type { AiKit } from "../types/Kits";
import type {
	ColorsInsert,
	ColorsResponse,
	Kits,
	KitsResponse,
	Projects,
	ProjectsResponse,
	FontsInsert,
	FontsResponse,
} from "../types/Data";

export const getProjectsByUser = async (
	user: User | null,
	supabase: SupabaseClient
): Promise<ProjectsResponse[] | null> => {
	try {
		if (!user) throw new Error("No user at get project by user");

		let { data, error } = await supabase
			.from("projects")
			.select("id, name, description")
			.eq("user_id", user.id);

		if (error) throw error;

		return data;
	} catch (error) {
		alert("Error loading user data!");
		console.log(error);
	}
	return null;
};

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

export const getColorsByKitsCategory = async (
	kitsCategory: Kits["category"],
	supabase: SupabaseClient
): Promise<ColorsResponse[] | null> => {
	try {
		let { data, error } = await supabase
			.from("kits")
			.select(`colors(category, name, hex)`)
			.eq("category", kitsCategory);

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

export const getColorsByKitId = async (
	kitId: number | null,
	supabase: SupabaseClient
): Promise<ColorsResponse[] | null> => {
	try {
		if (!kitId) throw new Error("No kit ID at get colors by kit ID");

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

export const getFontsByKitId = async (
	kitId: number | null,
	supabase: SupabaseClient
): Promise<FontsResponse[] | null> => {
	try {
		if (!kitId) throw new Error("No kit ID at get fonts by kit ID");

		let { data, error } = await supabase
			.from("fonts")
			.select("category, name, weight")
			.eq("kit_id", kitId);

		if (error) throw error;

		return data;
	} catch (error) {
		alert("Error loading fonts data!");
		console.log(error);
	}
	return null;
};

export const uploadKit = async (
	category: Kits["category"],
	projectId: Projects["id"] | null,
	kitTitle: AiKit["title"],
	user: User | null,
	supabase: SupabaseClient
) => {
	try {
		if (!user) throw new Error("No user at upload kit");
		if (!projectId) throw new Error("No project ID at upload kit");

		const updates = {
			project_id: projectId,
			user_id: user.id,
			title: kitTitle,
			category,
		};

		let { data, error } = await supabase
			.from("kits")
			.insert(updates)
			.select()
			.single();

		if (error) throw error;

		return data;
	} catch (error) {
		alert("Error inserting the kit data!");
		console.log(error);
	}
	return null;
};

export const uploadProject = async (
	name: Projects["name"],
	description: Projects["description"],
	user: User | null,
	supabase: SupabaseClient
) => {
	try {
		if (!user) throw new Error("No user at upload project");

		const updates = {
			user_id: user.id,
			name,
			description,
		};

		let { error } = await supabase
			.from("projects")
			.insert(updates)
			.eq("user_id", user.id);

		if (error) throw error;
	} catch (error) {
		alert("Error inserting the data!");
		console.log(error);
	}
};

export const uploadFonts = async (
	kitId: Kits["id"],
	displayFont: AiKit["displayFont"],
	textFont: AiKit["textFont"],
	supabase: SupabaseClient
) => {
	if (!kitId) throw new Error("No kit ID at upload fonts");
	try {
		const fontsData: FontsInsert[] = [
			{
				category: "DISPLAY",
				name: displayFont.name,
				weight: displayFont.weight,
				kit_id: kitId,
			},
			{
				category: "TEXT",
				name: textFont.name,
				weight: textFont.weight,
				kit_id: kitId,
			},
		];

		const { error } = await supabase.from("fonts").insert(fontsData);

		if (error) throw error;
	} catch (error) {
		alert("Error inserting fonts data!");
		console.log(error);
	}
};

export const uploadColors = async (
	kitId: Kits["id"],
	colors: AiKit["colors"],
	supabase: SupabaseClient
) => {
	if (!kitId) throw new Error("No kit ID at upload colors");
	try {
		const colorData: ColorsInsert[] = colors.map((color, i) => ({
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
