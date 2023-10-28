import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';
import { IPost } from '../model/types/post';

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com'
    }),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({
            query: (page: number = 1) => ({
                url: '/posts',
                params: {
                    _page: page,
                    _limit: 20
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
