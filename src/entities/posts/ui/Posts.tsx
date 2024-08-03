import React, { useEffect, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'

import s from './Posts.module.scss'

import {
  GetAllPublicPostsArgs,
  postsActions,
  selectPosts,
  useGetPublicPostByIdQuery,
  useGetUserPublicPostsQuery,
  useLazyGetUserPublicPostsQuery,
} from '@/entities'
import { commentsActions } from '@/features/comments'
import { ViewPostModal } from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useResize } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Modal } from '@/shared/ui'
import imageIcon from 'public/imageIcon.svg'

type Props = {
  scrollableID: string
}

const postDataArgs: GetAllPublicPostsArgs = {
  pageSize: 8,
  sortBy: '',
  sortDirection: 'desc',
}

export const Posts = ({ scrollableID }: Props) => {
  const { push, query } = useRouter()

  const userId = Number(query.userId?.[0])
  const postId = Number(query.userId?.[1])

  const { data: postsData } = useGetUserPublicPostsQuery({ userId, ...postDataArgs })
  const { data: postById } = useGetPublicPostByIdQuery({ postId }, { skip: !postId })
  const [getNextPosts] = useLazyGetUserPublicPostsQuery()

  const posts = useAppSelector(selectPosts)
  const dispatch = useAppDispatch()

  const { innerHeight } = useResize()
  const [lastUploadedPostId, setLastUploadedPostId] = useState<Nullable<number>>(null)
  const [openModal, setOpenModal] = useState(false)

  const hasMorePosts = postsData ? postsData.totalCount > posts.length : false

  useEffect(() => {
    if (postsData) {
      dispatch(postsActions.setPosts(postsData.items))
    }
  }, [postsData])

  useEffect(() => {
    if (postId) {
      setOpenModal(true)
    }
  }, [postId])

  const fetchPostsData = () => {
    const lastPostId = posts.slice(-1)[0].id

    if (lastPostId !== lastUploadedPostId) {
      getNextPosts({ userId, endCursorPostId: lastPostId, ...postDataArgs })
        .unwrap()
        .then(postsData => {
          dispatch(postsActions.fetchScrollPosts(postsData.items))
          setLastUploadedPostId(lastPostId)
        })
    }
  }

  const onCloseHandler = () => {
    dispatch(commentsActions.deleteComments({}))
    push(PATH.USER + `/${userId}`)
    setOpenModal(false)
  }

  const currentModal =
    postById && postById.ownerId === userId ? (
      <ViewPostModal postById={postById} open={openModal} onClose={onCloseHandler} />
    ) : (
      <Modal open={openModal} onClose={onCloseHandler}>
        Post not found!{' '}
      </Modal>
    )

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchPostsData}
        hasMore={hasMorePosts}
        loader={<span>...loading</span>}
        className={s.postsBlock}
        scrollableTarget={scrollableID}
        style={{ paddingBottom: `${innerHeight - 730}px` }}
      >
        {posts.map(post => {
          const src = post.images.filter(img => img.width === 1440)

          const openPostModalHandler = () => push(`${PATH.USER}/${userId}/${post.id}`)

          return (
            <Image
              src={src[0]?.url ?? imageIcon}
              key={post.id}
              width={200}
              height={200}
              priority={true}
              alt={'postItem'}
              className={s.post}
              onClick={openPostModalHandler}
            />
          )
        })}
      </InfiniteScroll>
      {postId ? currentModal : null}
    </>
  )
}
