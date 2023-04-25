export type Json =
	| string
	| number
	| boolean
	| null
	| { [key: string]: Json }
	| Json[];

export interface Database {
	public: {
		Tables: {
			colors: {
				Row: {
					category: "BASE" | "PRIMARY" | "ACCENT";
					hex: string;
					id: number;
					inserted_at: string;
					kit_id: number | null;
					name: string;
					updated_at: string;
				};
				Insert: {
					category: "BASE" | "PRIMARY" | "ACCENT";
					hex: string;
					id?: number;
					inserted_at?: string;
					kit_id?: number | null;
					name: string;
					updated_at?: string;
				};
				Update: {
					category?: "BASE" | "PRIMARY" | "ACCENT";
					hex?: string;
					id?: number;
					inserted_at?: string;
					kit_id?: number | null;
					name?: string;
					updated_at?: string;
				};
			};
			kits: {
				Row: {
					category: "STARTER" | "CUSTOM";
					id: number;
					inserted_at: string;
					project_id: number | null;
					title: string;
					updated_at: string;
					user_id: string | null;
				};
				Insert: {
					category: "STARTER" | "CUSTOM";
					id?: number;
					inserted_at?: string;
					project_id?: number | null;
					title: string;
					updated_at?: string;
					user_id?: string | null;
				};
				Update: {
					category?: "STARTER" | "CUSTOM";
					id?: number;
					inserted_at?: string;
					project_id?: number | null;
					title?: string;
					updated_at?: string;
					user_id?: string | null;
				};
			};
			profiles: {
				Row: {
					avatar_url: string | null;
					full_name: string | null;
					id: string;
					inserted_at: string | null;
					updated_at: string | null;
					username: string | null;
					website: string | null;
				};
				Insert: {
					avatar_url?: string | null;
					full_name?: string | null;
					id: string;
					inserted_at?: string | null;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
				Update: {
					avatar_url?: string | null;
					full_name?: string | null;
					id?: string;
					inserted_at?: string | null;
					updated_at?: string | null;
					username?: string | null;
					website?: string | null;
				};
			};
			projects: {
				Row: {
					description: string;
					id: number;
					inserted_at: string;
					name: string;
					updated_at: string;
					user_id: string;
				};
				Insert: {
					description: string;
					id?: number;
					inserted_at?: string;
					name: string;
					updated_at?: string;
					user_id: string;
				};
				Update: {
					description?: string;
					id?: number;
					inserted_at?: string;
					name?: string;
					updated_at?: string;
					user_id?: string;
				};
			};
			typefaces: {
				Row: {
					category: "DISPLAY" | "TEXT";
					font: string;
					id: number;
					inserted_at: string;
					kit_id: number | null;
					updated_at: string;
					weight: string | null;
				};
				Insert: {
					category: "DISPLAY" | "TEXT";
					font: string;
					id?: number;
					inserted_at?: string;
					kit_id?: number | null;
					updated_at?: string;
					weight?: string | null;
				};
				Update: {
					category?: "DISPLAY" | "TEXT";
					font?: string;
					id?: number;
					inserted_at?: string;
					kit_id?: number | null;
					updated_at?: string;
					weight?: string | null;
				};
			};
		};
		Views: {
			[_ in never]: never;
		};
		Functions: {
			[_ in never]: never;
		};
		Enums: {
			[_ in never]: never;
		};
		CompositeTypes: {
			[_ in never]: never;
		};
	};
}
