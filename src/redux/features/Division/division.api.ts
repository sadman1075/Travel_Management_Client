import { baseApi } from "@/redux/baseApi";

export const divisionApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        addDivision: builder.mutation({
            query: (division) => ({
                url: "/division/create",
                method: "POST",
                data: division,
            }),
            invalidatesTags: ["DIVISION"]
        }),
        updateDivision: builder.mutation({
            query: ({id,division}) => ({
                url: `/division/${id}`,
                method: "PATCH",
                data: division,
            }),
            invalidatesTags: ["DIVISION"]
        }),

        deleteDivision: builder.mutation({
            query: (id) => ({
                url: `/division/${id}`,
                method: "DELETE",
                data: null,
            }),
            invalidatesTags: ["DIVISION"]
        }),

        getDivision: builder.query({
            query: () => ({
                url: "/division",
                method: "GET"

            }),
            providesTags: ["DIVISION"]
        }),


    })
})

export const { useGetDivisionQuery, useAddDivisionMutation, useDeleteDivisionMutation,useUpdateDivisionMutation } = divisionApi