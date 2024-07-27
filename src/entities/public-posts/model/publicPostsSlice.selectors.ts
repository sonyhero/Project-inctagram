import { RootState } from '@/shared/store'

export const selectAllPosts = (state: RootState) => state.publicPostsSlice.allPosts
export const selectLastUploadedPostId = (state: RootState) =>
  state.publicPostsSlice.lastUploadedPostId
