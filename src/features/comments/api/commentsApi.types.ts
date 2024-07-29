import { ImageType } from '@/entities'

export type CommentsResponseType = {
  id: number
  postId: number
  from: {
    id: number
    username: string
    avatars: ImageType[]
  }
  content: string
  createdAt: Date
  answerCount: number
  likeCount: number
  isLiked: boolean
}

export type CommentsArgsType = {
  postId: number
  content: string
}

export type AnswerResponseType = Omit<CommentsResponseType, 'answerCount'>

export type AnswerArgsType = CommentsArgsType & {
  commentId: number
}

export type LikeCommentArgsType = {
  postId: number
  commentId: number
  likeStatus: LikeStatus
}

export type LikeAnswerArgsType = LikeCommentArgsType & {
  answerId: number
}

export enum LikeStatus {
  NONE = 'NONE',
  LIKE = 'LIKE',
  DISLIKE = 'DISLIKE',
}
