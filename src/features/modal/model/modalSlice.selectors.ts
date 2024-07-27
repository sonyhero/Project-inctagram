import { RootState } from '@/shared/store'

export const selectModal = (state: RootState) => state.modalSlice.open
export const selectModalExtra = (state: RootState) => state.modalSlice.openExtraModal
