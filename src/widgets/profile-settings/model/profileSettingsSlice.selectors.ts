import { RootState } from '@/shared/store'

export const selectTabSwitcherOptions = (state: RootState) =>
  state.profileSettingsSlice.tabSwitcherOptions
export const selectCurrentOption = (state: RootState) => state.profileSettingsSlice.currentOption
