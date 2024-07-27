import { RootState } from '@/shared/store'

export const selectPaginationOptions = (state: RootState) =>
  state.subscriptionSlice.paginationOptions
export const selectCurrentPage = (state: RootState) => state.subscriptionSlice.currentPage
export const selectPageSize = (state: RootState) => state.subscriptionSlice.pageSize
export const selectAccountTypeOptions = (state: RootState) =>
  state.subscriptionSlice.accountTypeOptions
export const selectIsOpenModal = (state: RootState) => state.subscriptionSlice.payment.isOpenModal
export const selectIsSuccessPaypal = (state: RootState) =>
  state.subscriptionSlice.payment.isSuccessPayPalPayment
export const selectIsSuccessStripe = (state: RootState) =>
  state.subscriptionSlice.payment.isSuccessStripePayment
