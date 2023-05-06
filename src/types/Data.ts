import type { Database } from "./supabase";
export type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
export type Projects = Database["public"]["Tables"]["projects"]["Row"];
export type Kits = Database["public"]["Tables"]["kits"]["Row"];
export type Colors = Database["public"]["Tables"]["colors"]["Row"];
export type Fonts = Database["public"]["Tables"]["fonts"]["Row"];

export type ProjectsResponse = {
	id: Projects["id"];
	name: Projects["name"];
	description: Projects["description"];
};

export type KitsResponse = {
	id: Kits["id"];
	project_id: Kits["project_id"];
	title: Kits["title"];
};

export type ColorsInsert = {
	kit_id: Colors["kit_id"];
	type: Colors["type"];
	name: Colors["name"];
	hex: Colors["hex"];
};

export type ColorsResponse = {
	type: Colors["type"];
	name: Colors["name"];
	hex: Colors["hex"];
};

export type FontsInsert = {
	kit_id: Fonts["kit_id"];
	type: Fonts["type"];
	name: Fonts["name"];
	weight: Fonts["weight"];
};

export type FontsResponse = {
	type: Fonts["type"];
	name: Fonts["name"];
	weight: Fonts["weight"];
};
