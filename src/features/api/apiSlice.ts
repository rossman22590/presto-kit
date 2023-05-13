import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import type { AiKit, Database, Kits, Projects } from "@types";
import {
	User,
	createBrowserSupabaseClient,
} from "@supabase/auth-helpers-nextjs";

const supabase = createBrowserSupabaseClient<Database>();

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["Project", "Kit"],
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

				const kits = aiKits.map((kit) => ({
					project_id: projectId,
					user_id: user.id,
					title: kit.title,
					type: "STARTER" as Kits["type"],
				}));

				const { error, data } = await supabase
					.from("kits")
					.insert(kits)
					.eq("user_id", user.id)
					.select()
					.order("id", { ascending: true });

				if (error) throw { error };

				return { data };
			},
		}),
	}),
});

export const {
	useAddProjectMutation,
	useGetLatestProjectQuery,
	useAddKitMutation,
	useAddAiKitsMutation,
} = apiSlice;
