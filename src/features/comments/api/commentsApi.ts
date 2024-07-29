import {
  AnswerArgsType,
  AnswerResponseType,
  CommentsArgsType,
  CommentsResponseType,
  LikeAnswerArgsType,
  LikeCommentArgsType,
} from './commentsApi.types'

import { baseApi } from '@/shared/api'

export const commentsApi = baseApi.injectEndpoints({
  endpoints: builder => {
    return {
      addComment: builder.mutation<CommentsResponseType, CommentsArgsType>({
        query: ({ postId, ...body }) => ({
          url: `v1/posts/${postId}/comments`,
          method: 'POST',
          body,
        }),
        invalidatesTags: ['CommentsPostById'],
      }),
      addAnswer: builder.mutation<AnswerResponseType, AnswerArgsType>({
        query: ({ postId, commentId, ...body }) => ({
          url: `v1/posts/${postId}/comments/${commentId}/answers`,
          method: 'POST',
          body,
        }),
      }),
      addLikeComment: builder.mutation<void, LikeCommentArgsType>({
        query: ({ postId, commentId, ...body }) => ({
          url: `v1/posts/${postId}/comments/${commentId}/like-status`,
          method: 'PUT',
          body,
        }),
      }),
      addLikeAnswer: builder.mutation<void, LikeAnswerArgsType>({
        query: ({ postId, commentId, answerId, ...body }) => ({
          url: `v1/posts/${postId}/comments/${commentId}/answers/${answerId}/like-status`,
          method: 'PUT',
          body,
        }),
      }),
    }
  },
})

export const {
  useAddCommentMutation,
  useAddAnswerMutation,
  useAddLikeCommentMutation,
  useAddLikeAnswerMutation,
} = commentsApi
