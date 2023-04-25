import type { Database } from "./supabase";
export type Projects = Database["public"]["Tables"]["projects"]["Row"];
export type Kits = Database["public"]["Tables"]["kits"]["Row"];
export type Typefaces = Database["public"]["Tables"]["typefaces"]["Row"];
export type Colors = Database["public"]["Tables"]["colors"]["Row"];
export type UploadTypefaces = Omit<
	Typefaces,
	"id" | "inserted_at" | "updated_at"
>;
export type UploadColors = Omit<Colors, "id" | "inserted_at" | "updated_at">;
