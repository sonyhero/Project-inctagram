import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { CommentsResponseType } from '@/features/comments/api'

const initialState = {
  comments: [] as CommentsResponseType[],
  pageNumber: 1,
  totalCount: 0,
}

export const commentsSlice = createSlice({
  name: 'commentsSlice',
  initialState,
  reducers: {
    setComments: (state, action: PayloadAction<CommentsResponseType[]>) => {
      state.comments = [...state.comments, ...action.payload]
    },
    setPageNumber: (state, _) => {
      state.pageNumber++
    },
    setTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload
    },
  },
})

export const commentsActions = commentsSlice.actions
