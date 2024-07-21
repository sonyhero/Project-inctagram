import { RootState } from '@/shared/store'

export const selectPosts = (state: RootState) => state.postsSlice.posts
export const selectPhotosPosts = (state: RootState) => state.postsSlice.photosPosts
