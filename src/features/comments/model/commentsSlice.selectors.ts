import { RootState } from '@/shared/store'

export const selectComments = (state: RootState) => state.commentsSlice.comments
export const selectCurrentPage = (state: RootState) => state.commentsSlice.currentPage
export const selectTotalCount = (state: RootState) => state.commentsSlice.totalCount
