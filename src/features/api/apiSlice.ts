import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database, Projects } from "@types";

const supabase = createBrowserSupabaseClient<Database>();

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["Project"],
	endpoints: (builder) => ({
		addProject: builder.mutation({
			queryFn: async ({ name, description, user }) => {
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
					.eq("user_id", user.id);

				if (error) throw { error };

				return { data: data[0] };
			},
			providesTags: ["Project"],
		}),
	}),
});

export const { useAddProjectMutation, useGetLatestProjectQuery } = apiSlice;
