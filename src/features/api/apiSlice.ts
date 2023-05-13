import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
	createBrowserSupabaseClient,
	User,
} from "@supabase/auth-helpers-nextjs";
import type {
	AiKit,
	Colors,
	Database,
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
			}): Promise<{ data: Projects[] }> => {
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
			queryFn: async ({ user }): Promise<{ data: Projects }> => {
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
			queryFn: async ({ projectId, user, title, type }) => {
				const { error, data } = await supabase
					.from("kits")
					.insert({ project_id: projectId, user_id: user.id, title, type })
					.eq("user_id", user.id)
					.select();

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Kit"],
		}),
		addAiKits: builder.mutation({
			queryFn: async ({
				projectId,
				user,
				aiKits,
			}: {
				projectId: number | undefined;
				user: User | null;
				aiKits: AiKit[];
			}) => {
				if (!user) throw new Error("No user at upload kit");

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
		addAiColors: builder.mutation({
			queryFn: async ({
				kitId,
				aiKit,
			}: {
				kitId: number;
				aiKit: AiKit;
			}): Promise<{ data: Colors[] }> => {
				const colors = aiKit.colors.map((color) => ({
					kit_id: kitId,
					type: color.type,
					name: color.name,
					hex: color.hex,
				}));

				const { error, data } = await supabase
					.from("colors")
					.insert(colors)
					.eq("kit_id", kitId)
					.select();

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Color"],
		}),
		addAiFonts: builder.mutation({
			queryFn: async ({
				kitId,
				aiKit,
			}: {
				kitId: number;
				aiKit: AiKit;
			}): Promise<{ data: Fonts[] }> => {
				const fonts: FontsInsert[] = [
					{
						kit_id: kitId,
						type: "DISPLAY",
						name: aiKit.displayFont.name,
						weight: aiKit.displayFont.weight,
					},
					{
						kit_id: kitId,
						type: "TEXT",
						name: aiKit.textFont.name,
						weight: aiKit.textFont.weight,
					},
				];

				const { error, data } = await supabase
					.from("fonts")
					.insert(fonts)
					.eq("kit_id", kitId)
					.select();

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Font"],
		}),
	}),
});

export const {
	useAddProjectMutation,
	useGetLatestProjectQuery,
	useAddKitMutation,
	useAddAiKitsMutation,
	useAddAiColorsMutation,
	useAddAiFontsMutation,
} = apiSlice;
