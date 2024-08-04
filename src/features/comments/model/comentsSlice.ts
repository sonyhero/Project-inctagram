import { createSlice } from '@reduxjs/toolkit'

import { getPublicPostComments } from '@/entities'
import { addLikeComment, CommentsResponseType } from '@/features/comments/api'

type InitialStateType = {
  comments: CommentsResponseType[]
  totalCount: number
  currentPage: number
}

const initialState: InitialStateType = {
  comments: [],
  totalCount: 0,
  currentPage: 1,
}

export const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
    deleteComments: () => {
      return initialState
    },
  },
  extraReducers: builder => {
    builder.addMatcher(getPublicPostComments.matchFulfilled, (state, { payload }) => {
      state.totalCount = payload.totalCount

      if (state.currentPage === 1) {
        state.comments = payload.items
      } else {
        state.comments = [...state.comments, ...payload.items]
      }

      state.currentPage += 1
    })
    builder.addMatcher(addLikeComment.matchFulfilled, (state, action) => {
      const commentId = action.meta.arg.originalArgs.commentId

      const index = state.comments.findIndex(comment => comment.id === commentId)

      state.comments[index].isLiked = !state.comments[index].isLiked

      state.comments[index].isLiked
        ? (state.comments[index].likeCount += 1)
        : (state.comments[index].likeCount -= 1)
    })
  },
})

export const commentsActions = commentsSlice.actions
