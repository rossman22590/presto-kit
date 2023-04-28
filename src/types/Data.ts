import type { Database } from "./supabase";
export type Projects = Database["public"]["Tables"]["projects"]["Row"];
export type Kits = Database["public"]["Tables"]["kits"]["Row"];
export type Colors = Database["public"]["Tables"]["colors"]["Row"];
export type Typefaces = Database["public"]["Tables"]["typefaces"]["Row"];

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
	category: Colors["category"];
	name: Colors["name"];
	hex: Colors["hex"];
};

export type ColorsResponse = {
	category: Colors["category"];
	name: Colors["name"];
	hex: Colors["hex"];
};

export type TypefacesInsert = {
	kit_id: Typefaces["kit_id"];
	category: Typefaces["category"];
	font: Typefaces["font"];
	weight: Typefaces["weight"];
};

export type TypographyResponse = {
	category: Typefaces["category"];
	font: Typefaces["font"];
	weight: Typefaces["weight"];
};
