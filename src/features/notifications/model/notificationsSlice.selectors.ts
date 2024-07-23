import { RootState } from '@/shared/store'

export const selectNotifications = (state: RootState) => state.notificationsSlice.notifications
