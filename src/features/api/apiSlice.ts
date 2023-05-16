import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { getFontByType } from "@utils";
import {
	createBrowserSupabaseClient,
	User,
} from "@supabase/auth-helpers-nextjs";
import type {
	AiKit,
	Color,
	ColorsInsert,
	Database,
	Font,
	FontsInsert,
	FullKitWithProject,
	FullKitWithoutId,
	Kits,
	Projects,
} from "@types";

const supabase = createBrowserSupabaseClient<Database>();

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["Project", "Kit", "Color", "Font"],
	endpoints: (builder) => ({
		addProject: builder.mutation({
			queryFn: async ({
				name,
				description,
				user,
			}: {
				name: string;
				description: string;
				user: User | null;
			}): Promise<{ data: Projects[] }> => {
				if (!user) throw new Error("No user at add project");

				const { error, data } = await supabase
					.from("projects")
					.insert({ user_id: user.id, name, description })
					.eq("user_id", user.id)
					.select();

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Project"],
		}),
		getLatestProject: builder.query({
			queryFn: async ({
				user,
			}: {
				user: User | null;
			}): Promise<{ data: Projects }> => {
				if (!user) throw new Error("No user at get latest project");

				const { error, data } = await supabase
					.from("projects")
					.select()
					.eq("user_id", user.id)
					.order("id", { ascending: false })
					.limit(1)
					.single();

				if (error) throw { error };

				return { data };
			},
			providesTags: ["Project"],
		}),
		addKit: builder.mutation({
			queryFn: async ({
				projectId,
				user,
				title,
				type,
			}: {
				projectId: number;
				user: User | null;
				title: string;
				type: Kits["type"];
			}): Promise<{ data: Kits }> => {
				if (!user) throw new Error("No user at add kit");

				const { error, data } = await supabase
					.from("kits")
					.insert({ project_id: projectId, user_id: user.id, title, type })
					.eq("user_id", user.id)
					.select()
					.single();

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Kit"],
		}),
		addColors: builder.mutation({
			queryFn: async ({
				kitId,
				colors,
			}: {
				kitId: number;
				colors: Color[];
			}) => {
				const colorsInsert = colors.map((color) => ({
					kit_id: kitId,
					type: color.type,
					name: color.name,
					hex: color.hex,
				}));

				const { error, data } = await supabase
					.from("colors")
					.insert(colorsInsert)
					.eq("kit_id", kitId)
					.select();

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Color"],
		}),
		addFonts: builder.mutation({
			queryFn: async ({
				kitId,
				fonts,
			}: {
				kitId: number;
				fonts: { displayFont: Font; textFont: Font };
			}) => {
				const fontsInsert: FontsInsert[] = [
					{
						kit_id: kitId,
						type: "DISPLAY",
						name: fonts.displayFont.name,
						weight: fonts.displayFont.weight,
					},
					{
						kit_id: kitId,
						type: "TEXT",
						name: fonts.textFont.name,
						weight: fonts.textFont.weight,
					},
				];

				const { error, data } = await supabase
					.from("fonts")
					.insert(fontsInsert)
					.eq("kit_id", kitId)
					.select();

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Font"],
		}),
		addFullKit: builder.mutation({
			queryFn: async ({
				kit,
				user,
				type,
			}: {
				kit: FullKitWithoutId;
				user: User | null;
				type: Kits["type"];
			}) => {
				if (!user) throw new Error("No user at add kit");

				const kitInsert = {
					project_id: kit.projectId,
					user_id: user.id,
					title: kit.title,
					type,
				};

				const { data: kitData, error: kitError } = await supabase
					.from("kits")
					.insert(kitInsert)
					.eq("user_id", user.id)
					.select()
					.single();

				if (kitError) throw { kitError };

				const colorsInsert = kit.colors.map((color) => ({
					kit_id: kitData.id,
					type: color.type,
					name: color.name,
					hex: color.hex,
				}));

				const { data: colorsData, error: colorsError } = await supabase
					.from("colors")
					.insert(colorsInsert)
					.eq("kit_id", kitData.id)
					.select();

				if (colorsError) throw { colorsError };

				const fontsInsert: FontsInsert[] = [
					{
						kit_id: kitData.id,
						type: "DISPLAY",
						name: kit.displayFont.name,
						weight: kit.displayFont.weight,
					},
					{
						kit_id: kitData.id,
						type: "TEXT",
						name: kit.textFont.name,
						weight: kit.textFont.weight,
					},
				];

				const { data: fontsData, error: fontsError } = await supabase
					.from("fonts")
					.insert(fontsInsert)
					.eq("kit_id", kitData.id)
					.select();

				if (fontsError) throw { fontsError };

				const data = {
					kits: kitData,
					colors: colorsData,
					fonts: fontsData,
				};

				return { data };
			},
			invalidatesTags: ["Kit", "Color", "Font"],
		}),
		addFullAiKits: builder.mutation({
			queryFn: async ({
				projectId,
				user,
				aiKits,
			}: {
				projectId: number;
				user: User | null;
				aiKits: AiKit[];
			}) => {
				if (!user) throw new Error("No user at add AI kits");

				const kitsInsert = aiKits.map((kit) => ({
					project_id: projectId,
					user_id: user.id,
					title: kit.title,
					type: "STARTER" as Kits["type"],
				}));

				const { data: kitsData, error: kitsError } = await supabase
					.from("kits")
					.insert(kitsInsert)
					.eq("user_id", user.id)
					.select()
					.order("id", { ascending: true });

				if (kitsError) throw { kitsError };

				const kitIds = kitsData?.map((kit) => kit.id);

				let colorsInsert: ColorsInsert[] = [];
				let fontsInsert: FontsInsert[] = [];
				kitIds.forEach((kitId, i) => {
					colorsInsert.push(
						...aiKits[i].colors.map((color) => ({
							kit_id: kitId,
							type: color.type,
							name: color.name,
							hex: color.hex,
						}))
					);
					fontsInsert.push(
						{
							kit_id: kitId,
							type: "DISPLAY",
							name: aiKits[i].displayFont.name,
							weight: aiKits[i].displayFont.weight,
						},
						{
							kit_id: kitId,
							type: "TEXT",
							name: aiKits[i].textFont.name,
							weight: aiKits[i].textFont.weight,
						}
					);
				});

				const { data: colorsData, error: colorsError } = await supabase
					.from("colors")
					.insert(colorsInsert)
					.select();

				if (colorsError) throw { colorsError };

				const { data: fontsData, error: fontsError } = await supabase
					.from("fonts")
					.insert(fontsInsert)
					.select();

				if (fontsError) throw { fontsError };

				const data = {
					kits: kitsData,
					colors: colorsData,
					fonts: fontsData,
				};

				return { data };
			},
			invalidatesTags: ["Kit", "Color", "Font"],
		}),
		getLatestFullKitByType: builder.query({
			queryFn: async ({
				type,
			}: {
				type: Kits["type"];
			}): Promise<{ data: FullKitWithProject }> => {
				let { data, error } = await supabase
					.from("kits")
					.select(
						`
        		id, 
        		project_id,
        		title,
        		project: projects(name, description),
        		colors: colors(type, name, hex),
        		fonts: fonts(type, name, weight)
        	`
					)
					.eq("type", type)
					.order("inserted_at", { ascending: false })
					.limit(1)
					.single();

				if (error) throw error;
				if (!data) throw new Error("No kit found");

				const kit = data;
				if (!kit.project_id) {
					throw new Error("Project ID not found");
				}

				if (!kit.fonts || !Array.isArray(kit.fonts)) {
					throw new Error("Fonts are missing or not an array");
				}

				const displayFont = getFontByType("DISPLAY", kit.fonts);
				if (!displayFont) throw new Error("Display font not found");

				const textFont = getFontByType("TEXT", kit.fonts);
				if (!textFont) throw new Error("Text font not found");

				if (!kit.project || Array.isArray(kit.project)) {
					throw new Error("Project is missing or not an object");
				}

				if (!Array.isArray(kit.colors)) {
					throw new Error("Colors are missing or not an array");
				}

				const fullKit = {
					id: kit.id,
					projectId: kit.project_id,
					projectName: kit.project.name,
					projectDescription: kit.project.description,
					title: kit.title,
					colors: kit.colors,
					displayFont,
					textFont,
				};

				return { data: fullKit };
			},
			providesTags: ["Project", "Kit", "Color", "Font"],
		}),
	}),
});

export const {
	useAddProjectMutation,
	useGetLatestProjectQuery,
	useAddKitMutation,
	useAddColorsMutation,
	useAddFontsMutation,
	useAddFullKitMutation,
	useAddFullAiKitsMutation,
	useGetLatestFullKitByTypeQuery,
} = apiSlice;
