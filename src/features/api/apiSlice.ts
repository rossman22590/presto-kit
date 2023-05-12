import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fakeBaseQuery(),
	tagTypes: ["Project"],
	endpoints: (builder) => ({
		addProject: builder.mutation({
			queryFn: async ({ name, description, user, supabase }) => {
				const { error, data } = await supabase
					.from("projects")
					.insert({ user_id: user.id, name, description })
					.eq("user_id", user.id);

				if (error) throw { error };

				return { data };
			},
			invalidatesTags: ["Project"],
		}),
	}),
});

export const { useAddProjectMutation } = apiSlice;
