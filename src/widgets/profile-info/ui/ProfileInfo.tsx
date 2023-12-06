import React, { useEffect, useRef, useState } from 'react'

import { useAutoAnimate } from '@formkit/auto-animate/react'
import Image from 'next/image'
import { useRouter } from 'next/router'

import s from './ProfileInfo.module.scss'

import {
  postsActions,
  useGetPostsByUserIdQuery,
  useLazyGetPostByIdQuery,
  useLazyGetPostsByUserIdQuery,
} from '@/entities/posts'
import { useGetProfileQuery } from '@/entities/profile'
import { MeResponseType, useMeQuery } from '@/features/auth'
import { modalActions } from '@/features/modal'
import { PATH } from '@/shared/config/routes'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Nullable } from '@/shared/types'
import { Button, Typography } from '@/shared/ui'
import { Avatar } from 'src/entities/avatar'

export const ProfileInfo = () => {
  const { data: userData } = useMeQuery()
  const { userId } = userData as MeResponseType
  const { data: profileData } = useGetProfileQuery(userId)
  const { t } = useTranslation()
  const { push } = useRouter()
  const posts = useAppSelector(state => state.postsSlice.posts)
  const publicationCount = useAppSelector(state => state.postsSlice.publicationCount)
  const dispatch = useAppDispatch()

  const { data: postsData } = useGetPostsByUserIdQuery({
    pageSize: 8,
    sortBy: '',
    sortDirection: 'desc',
  })
  const [getNextPosts] = useLazyGetPostsByUserIdQuery()
  const [getPost] = useLazyGetPostByIdQuery()

  const [getLastUploadedPostId, setLastUploadedPostId] = useState<Nullable<number>>(null)
  const [postsRef] = useAutoAnimate<HTMLDivElement>()

  useEffect(() => {
    if (posts.length === 0) {
      if (postsData && postsData.items.length > 0) {
        dispatch(postsActions.updatePublicationCount(postsData.totalCount))
        dispatch(postsActions.setPosts(postsData.items))
      }
    }
  }, [postsData])

  const showProfileSettingsHandler = () => {
    push(PATH.MY_PROFILE_SETTINGS)
  }

  const openPostModalHandler = (id: number) => {
    getPost({ postId: id })
      .unwrap()
      .then(postData => {
        dispatch(postsActions.setPost(postData))
        dispatch(modalActions.setOpenModal('viewPostModal'))
      })
  }

  //infinity scroll
  const postsBlockRef = useRef<Nullable<HTMLDivElement>>(null)

  useEffect(() => {
    const element = postsBlockRef.current

    if (element) {
      const handleScroll = () => {
        const atBottom = element.scrollTop + element.clientHeight >= element.scrollHeight

        if (atBottom) {
          const lastPostId = posts.slice(-1)[0].id

          if (lastPostId !== getLastUploadedPostId) {
            getNextPosts({
              idLastUploadedPost: lastPostId,
              pageSize: 8,
              sortBy: '',
              sortDirection: 'desc',
            })
              .unwrap()
              .then(postsData => {
                dispatch(postsActions.setPosts(postsData.items))
                setLastUploadedPostId(lastPostId)
              })
          }
        }
      }

      element.addEventListener('scroll', handleScroll)

      return () => {
        element.removeEventListener('scroll', handleScroll)
      }
    }
  }, [posts, getNextPosts, getLastUploadedPostId])

  const windowHeight = window.innerHeight
  const paddingValue = windowHeight * 0.67

  return (
    <div className={s.profileBlock} ref={postsBlockRef}>
      <div className={s.mainInfo}>
        <div className={s.photoBlock}>
          <Avatar userId={userId} className={s.photo} />
        </div>
        <div className={s.descriptionBlock}>
          <div className={s.nameAndSettings}>
            <Typography variant={'h1'}>{profileData?.userName}</Typography>
            <Button variant={'secondary'} onClick={showProfileSettingsHandler}>
              {t.myProfile.profilePage.profileSettings}
            </Button>
          </div>
          <div className={s.statistic}>
            <div>
              <Typography variant={'bold14'}>0</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.following}</Typography>
            </div>
            <div>
              <Typography variant={'bold14'}>0</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.followers}</Typography>
            </div>
            <div>
              <Typography variant={'bold14'}>{publicationCount}</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.publications}</Typography>
            </div>
          </div>
          <div className={s.aboutMe}>
            <Typography variant={'regular16'}>{profileData?.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div className={s.postsBlock} style={{ paddingBottom: `${paddingValue}px` }} ref={postsRef}>
        {posts.map(el => {
          return (
            <Image
              src={el.images[0].url}
              key={el.id}
              width={1000}
              height={1000}
              priority={true}
              alt={'postItem'}
              className={s.post}
              onClick={() => openPostModalHandler(el.id)}
            />
          )
        })}
      </div>
    </div>
  )
}
