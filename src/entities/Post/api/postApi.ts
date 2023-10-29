import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPost } from '../model/types/post';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com'
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], {page?: number, limit?: number}>({
            query: ({ page, limit }) => ({
                url: '/posts',
                params: {
                    _page: page,
                    _limit: limit
                }
            }),
        }),
        fetchPost: build.query<IPost, number>({
            query: (postId) => ({
                url: `/posts/${postId}`,
            })
        }),
    })
})
