import React, { ChangeEvent, useEffect, useState } from 'react'

import ImageNext from 'next/image'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import { toast } from 'react-toastify'

import s from './ViewPostModal.module.scss'

import {
  PostsResponseType,
  useGetPublicUserProfileByIdQuery,
  useLazyGetPublicPostCommentsQuery,
} from '@/entities'
import { AvatarOwner } from '@/entities/avatar-owner'
import { useMeQuery } from '@/features/auth'
import { commentsActions, selectComments, selectTotalCount } from '@/features/comments'
import { useAddCommentMutation } from '@/features/comments/api'
import { modalActions, NameExtraModal } from '@/features/modal'
import { EditBlock } from '@/features/modal/ui/view-post-modal/edit-block'
import { PATH } from '@/shared/config/routes'
import { usePostImagePagination, useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import {
  Bookmark,
  Button,
  Edit,
  Heart,
  Loader,
  Modal,
  MoreHorizontal,
  PaperPlane,
  PhotoPagination,
  TextField,
  Trash,
  Typography,
} from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'
import { getDayMonthTime } from '@/shared/utils'

type Props = {
  open: boolean
  onClose: () => void
  postById: PostsResponseType
}

export const ViewPostModal = ({ open, onClose, postById }: Props) => {
  const { locale, push, query } = useRouter()
  const postId = Number(query.userId?.[1])
  const profileId = Number(query.userId?.[0])
  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId })
  const [addComment, { isLoading }] = useAddCommentMutation()

  const comments = useAppSelector(selectComments)
  const totalCount = useAppSelector(selectTotalCount)

  const [currentPage, setCurrentPage] = useState<number>(1)

  const [getComments] = useLazyGetPublicPostCommentsQuery()

  const { t } = useTranslation()

  const { data: meData } = useMeQuery()
  const isMe = meData ? meData.userId === profileId : false

  const dispatch = useAppDispatch()

  const [editMode, setEditMode] = useState(false)

  const [comment, setComment] = useState<string>('')

  const { filterImages, activeImage, prevImage, nextImage, activeIndex, setActiveIndex } =
    usePostImagePagination({ images: postById?.images })

  const isActivePhoto = postById?.images && postById?.images.length > 0 && activeImage

  const closeModal = () => {
    if (editMode) {
      setEditMode(false)
    } else {
      onClose()
      push(`${PATH.USER}/${profileId}`)
    }
  }

  const onChangeCommentTextHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setComment(event.currentTarget.value)
  }

  const dropDownMenuSize = [
    {
      id: 1,
      component: (
        <div onClick={() => {}} className={s.itemActivity}>
          <Edit />
          <Typography variant={'regular14'} color={'primary'} onClick={() => setEditMode(true)}>
            {t.myProfile.profilePage.viewPost.editPost}
          </Typography>
        </div>
      ),
    },
    {
      id: 2,
      component: (
        <div
          onClick={() => {
            dispatch(modalActions.setOpenExtraModal(NameExtraModal.deletePostModal))
          }}
          className={s.itemActivity}
        >
          <Trash />
          <Typography variant={'regular14'} color={'primary'}>
            {t.myProfile.profilePage.viewPost.deletePost}
          </Typography>
        </div>
      ),
    },
  ]

  const onPublishCommentHandler = () => {
    if (postId) {
      addComment({ postId, content: comment })
        .unwrap()
        .then(() => {
          toast.success('Комментарий добавлен')
          setComment('')
        })
    }
  }

  useEffect(() => {
    getComments({ postId, pageSize: 6, pageNumber: currentPage })
      .unwrap()
      .then(res => {
        if (res.items) {
          dispatch(commentsActions.setComments(res.items))
          dispatch(commentsActions.setTotalCount(res.totalCount))
        }
      })
  }, [postId, currentPage])

  const fetchHandler = () => {
    setCurrentPage(prev => prev + 1)
  }

  return (
    <Modal
      className={s.modalBlock}
      showHeader={editMode}
      title={t.myProfile.profilePage.viewPost.editPost}
      open={open}
      onClose={closeModal}
      showCloseButton={editMode}
      contentBoxClassname={s.contentBox}
    >
      {isActivePhoto && (
        <div className={s.modalContent}>
          <div className={s.lastPhoto}>
            <ImageNext
              src={activeImage}
              alt={'post'}
              className={s.photo}
              width={500}
              height={500}
            />
            <PhotoPagination
              changePhotoNext={nextImage}
              changePhotoPrev={prevImage}
              photosArr={filterImages}
              changePhotoIndex={setActiveIndex}
              activeIndex={activeIndex}
            />
          </div>
          {!editMode ? (
            <div className={s.postDescriptionBlock}>
              <div className={s.topContent}>
                <div className={s.photoBlock}>
                  <AvatarOwner avatarOwner={profileData?.avatars?.[0]?.url} className={s.avatar} />
                  <Typography variant={'h3'}>{profileData?.userName}</Typography>
                </div>
                {isMe && (
                  <DropDownMenu
                    trigger={<MoreHorizontal />}
                    side={'bottom'}
                    items={dropDownMenuSize}
                    align={'end'}
                  />
                )}
              </div>
              <div className={s.middleContent}>
                {postById?.description && (
                  <div className={s.descriptionBlock}>
                    <AvatarOwner avatarOwner={profileData?.avatars?.[0]?.url} />
                    <div>
                      <Typography variant={'regular14'} className={s.desc}>
                        <strong>{profileData?.userName}</strong> {postById.description}
                      </Typography>
                      <Typography variant={'small'} color={'secondary'}>
                        {getDayMonthTime(postById.createdAt, locale ?? 'en')}
                      </Typography>
                    </div>
                  </div>
                )}

                <InfiniteScroll
                  next={fetchHandler}
                  hasMore={totalCount > comments.length}
                  loader={<Loader />}
                  dataLength={100}
                  className={s.commentsBlock}
                  height={275}
                >
                  {comments.map(comment => {
                    const { from, content, id, createdAt } = comment

                    return (
                      <div className={s.comment} key={id}>
                        <AvatarOwner avatarOwner={from?.avatars?.[0]?.url} />

                        <div>
                          <Typography variant={'regular14'} className={s.desc}>
                            <strong>{from.username}</strong> {content}
                          </Typography>
                          <Typography variant={'small'} color={'secondary'}>
                            {getDayMonthTime(createdAt.toString(), locale ?? 'en')}
                          </Typography>
                        </div>
                      </div>
                    )
                  })}
                </InfiniteScroll>
              </div>
              <div className={s.bottomActivityBlock}>
                <div className={s.likeSaveSetBlock}>
                  <div className={s.likeAndSet}>
                    <Heart />
                    <PaperPlane />
                  </div>
                  <Bookmark />
                </div>
                <div className={s.viewsAndCount}>
                  <div className={s.views}>
                    {[0, 1, 2].map(el => {
                      return <div key={el} className={s.view}></div>
                    })}
                  </div>
                  <div className={s.count}>
                    <Typography variant={'regular14'} color={'primary'}>
                      0
                    </Typography>
                    <Typography variant={'bold14'} color={'primary'}>
                      &quot;{t.myProfile.profilePage.viewPost.like}&quot;
                    </Typography>
                  </div>
                </div>
                <Typography variant={'small'} color={'secondary'}>
                  {getDayMonthTime(postById.createdAt, locale ?? 'en')}
                </Typography>
              </div>
              <div className={s.bottomContent}>
                <TextField
                  style={{ border: 'none' }}
                  type={'default'}
                  className={s.addComment}
                  value={comment}
                  onChange={onChangeCommentTextHandler}
                  placeholder={t.myProfile.profilePage.viewPost.addAComment}
                />
                <Button
                  disabled={comment.length < 1 || isLoading}
                  onClick={onPublishCommentHandler}
                  variant={'text'}
                >
                  {t.myProfile.profilePage.viewPost.publish}
                </Button>
              </div>
            </div>
          ) : (
            <EditBlock setEditMode={setEditMode} postById={postById} />
          )}
        </div>
      )}
    </Modal>
  )
}
