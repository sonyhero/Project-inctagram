import { RootState } from '@/shared/store'

export const selectPaginationOptions = (state: RootState) =>
  state.subscriptionSlice.paginationOptions
export const selectCurrentPage = (state: RootState) => state.subscriptionSlice.currentPage
export const selectPageSize = (state: RootState) => state.subscriptionSlice.pageSize
