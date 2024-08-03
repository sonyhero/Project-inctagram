import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CommentsResponseType } from '@/features/comments/api'

const initialState = {
  comments: [] as CommentsResponseType[],
  totalCount: 0,
}

export const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentsResponseType[]>) => {
      state.comments = [...state.comments, ...action.payload]
    },
    deleteComments: (state, _) => {
      state.comments = []
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
  },
})

export const commentsActions = commentsSlice.actions
