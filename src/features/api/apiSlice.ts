import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	createBrowserSupabaseClient,
	User,
} from "@supabase/auth-helpers-nextjs";
import type {
	AiKit,
	Color,
	Colors,
	Database,
	Font,
	Fonts,
	FontsInsert,
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
				if (!user) throw new Error();

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
				if (!user) throw new Error();

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
				if (!user) throw new Error();

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
		addAiKits: builder.mutation({
			queryFn: async ({
				projectId,
				user,
				aiKits,
			}: {
				projectId: number;
				user: User | null;
				aiKits: AiKit[];
			}) => {
				if (!user) throw new Error();

				const kitsInsert = aiKits.map((kit) => ({
					project_id: projectId,
					user_id: user.id,
					title: kit.title,
					type: "STARTER" as Kits["type"],
				}));

				const { error, data } = await supabase
					.from("kits")
					.insert(kitsInsert)
					.eq("user_id", user.id)
					.select()
					.order("id", { ascending: true });

				if (error) throw { error };

				const kits = data;
				const kitIds = data?.map((kit) => kit.id);

				return { data: { kits, kitIds } };
			},
			invalidatesTags: ["Kit"],
		}),
	}),
});

export const {
	useAddProjectMutation,
	useGetLatestProjectQuery,
	useAddKitMutation,
	useAddColorsMutation,
	useAddFontsMutation,
	useAddAiKitsMutation,
} = apiSlice;
