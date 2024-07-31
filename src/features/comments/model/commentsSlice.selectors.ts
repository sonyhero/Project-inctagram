import { RootState } from '@/shared/store'

export const selectComments = (state: RootState) => state.commentsSlice.comments
export const selectPageNumber = (state: RootState) => state.commentsSlice.pageNumber
export const selectTotalCount = (state: RootState) => state.commentsSlice.totalCount
