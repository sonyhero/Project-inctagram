import {
  GetAllPublicPostsArgs,
  GetPublicCommentsArgs,
  GetPublicCommentsResponse,
  GetPublicPostsResponse,
  GetPublicUserProfileByIdResponse,
  GetUserPublicPostsArgs,
  PostArgsType,
  PostsImagesResponse,
  PostsResponseType,
  UploadIdType,
} from '@/entities/posts'
import { baseApi } from '@/shared/api'

const postsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      createPost: builder.mutation<PostsResponseType, PostArgsType>({
        query: body => ({
          url: `v1/posts`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['Posts', 'User'],
      }),
      uploadPostImage: builder.mutation<PostsImagesResponse, FormData>({
        query: body => ({
          url: `v1/posts/image`,
          method: 'POST',
          body,
        }),
        invalidatesTags: [],
      }),
      deletePostImage: builder.mutation<void, UploadIdType>({
        query: ({ uploadId }) => ({
          url: `v1/posts/image/${uploadId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts', 'PostById'],
      }),
      updatePostById: builder.mutation<void, { postId: number; description: string }>({
        query: ({ postId, description }) => ({
          url: `v1/posts/${postId}`,
          method: 'PUT',
          body: { description },
        }),
        invalidatesTags: ['PostById'],
      }),
      deletePostById: builder.mutation<void, { postId: number }>({
        query: ({ postId }) => ({
          url: `v1/posts/${postId}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Posts', 'User'],
      }),
      getAllPublicPosts: builder.query<GetPublicPostsResponse, GetAllPublicPostsArgs>({
        query: ({ endCursorPostId, ...params }) => ({
          url: `v1/public-posts/all/${endCursorPostId}`,
          method: 'GET',
          params,
        }),
        providesTags: ['Posts'],
      }),
      getUserPublicPosts: builder.query<GetPublicPostsResponse, GetUserPublicPostsArgs>({
        query: ({ userId, endCursorPostId, ...params }) => ({
          url: `v1/public-posts/user/${userId}/${endCursorPostId}`,
          method: 'GET',
          params,
        }),
        providesTags: ['Posts'],
      }),
      getPublicPostById: builder.query<PostsResponseType, { postId: number }>({
        query: ({ postId }) => ({
          url: `v1/public-posts/${postId}`,
          method: 'GET',
        }),
        providesTags: ['PostById'],
      }),
      getPublicPostComments: builder.query<GetPublicCommentsResponse, GetPublicCommentsArgs>({
        query: ({ postId, ...params }) => ({
          url: `v1/public-posts/${postId}/comments`,
          method: 'GET',
          params,
        }),
        providesTags: ['CommentsPostById'],
      }),
      getPublicUserProfileById: builder.query<
        GetPublicUserProfileByIdResponse,
        { profileId: number }
      >({
        query: ({ profileId }) => ({
          url: `v1/public-user/profile/${profileId}`,
          method: 'GET',
        }),
        providesTags: [],
      }),
    }
  },
})

export const {
  useCreatePostMutation,
  useUploadPostImageMutation,
  useUpdatePostByIdMutation,
  useDeletePostByIdMutation,
  useDeletePostImageMutation,
  useGetPublicUserProfileByIdQuery,
  useGetUserPublicPostsQuery,
  useLazyGetUserPublicPostsQuery,
  useGetPublicPostByIdQuery,
  useLazyGetPublicPostByIdQuery,
  useGetAllPublicPostsQuery,
  useLazyGetAllPublicPostsQuery,
  useGetPublicPostCommentsQuery,
  useLazyGetPublicPostCommentsQuery,
  util: { getRunningQueriesThunk },
} = postsApi

//export endpoints for use in SSR
export const { getUserPublicPosts, getPublicUserProfileById, getPublicPostById } =
  postsApi.endpoints
