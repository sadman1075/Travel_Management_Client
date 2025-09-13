import { baseApi } from "@/redux/baseApi";

export const tourApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        addTour: builder.mutation({
            query: (tourTypeName) => ({
                url: "/tour/create-tour-type",
                method: "POST",
                data: tourTypeName,
            }),
            invalidatesTags: ["TOUR"]
        }),
        updateTourTypes: builder.mutation({
            query: ({ id, tourTypes }) => ({
                url: `/tour/tour-types/${id}`,
                method: "PATCH",
                data: tourTypes,
            }),
            invalidatesTags: ["TOUR"]
        }),

        getTourTypes: builder.query({
            query: () => ({
                url: "/tour/tour-types",
                method: "GET"

            }),
            providesTags: ["TOUR"]
        }),
        deleteTourTypes: builder.mutation({
            query: (id) => ({
                url: `/tour/tour-types/${id}`,
                method: "DELETE",


            }),
            invalidatesTags: ["TOUR"]
        }),

        createTour: builder.mutation({
            query: (tour) => ({
                url: "/tour/create",
                method: "POST",
                data: tour,
            }),
            invalidatesTags: ["TOUR"]
        }),

        getAllTour: builder.query({
            query: () => ({
                url: "/tour",
                method: "GET"

            }),
            providesTags: ["TOUR"]
        }),
        getSingleTour: builder.query({
            query: (id) => ({
                url: `/tour/${id}`,
                method: "GET"

            }),
            providesTags: ["TOUR"]
        }),

    })
})

export const { useAddTourMutation, useGetTourTypesQuery, useDeleteTourTypesMutation, useUpdateTourTypesMutation, useCreateTourMutation, useGetAllTourQuery,useGetSingleTourQuery } = tourApi