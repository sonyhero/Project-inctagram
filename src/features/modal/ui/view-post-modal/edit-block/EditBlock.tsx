import React, { ChangeEvent, useState } from 'react'

import { useRouter } from 'next/router'

import s from './EditBlock.module.scss'

import {
  PostsResponseType,
  useGetPublicUserProfileByIdQuery,
  useUpdatePostByIdMutation,
} from '@/entities'
import { AvatarOwner } from '@/entities/avatar-owner'
import { useTranslation } from '@/shared/hooks'
import { Button, TextAreaField, Typography } from '@/shared/ui'

type Props = {
  setEditMode: (value: boolean) => void
  postById: PostsResponseType
}

export const EditBlock = ({ postById, setEditMode }: Props) => {
  const { query } = useRouter()
  const { t } = useTranslation()
  const postId = Number(query.userId?.[1])
  const profileId = Number(query.userId?.[0])
  const { data: profileData } = useGetPublicUserProfileByIdQuery({ profileId })
  const [updatePost] = useUpdatePostByIdMutation()

  const [value, setValue] = useState(postById?.description ?? '')

  const onChangeTextHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.currentTarget.value)
  }

  const onSaveHandler = () => {
    if (postId) {
      updatePost({
        postId,
        description: value.length > 500 ? value.slice(0, 500) : value,
      })
        .unwrap()
        .then(() => {
          setEditMode(false)
        })
    }
  }

  return (
    <div className={s.editBlock}>
      <div className={s.topContent}>
        <div className={s.photoBlock}>
          <AvatarOwner avatarOwner={profileData?.avatars?.[0]?.url} className={s.avatar} />
          <Typography variant={'h3'}>{profileData?.userName}</Typography>
        </div>
        <div>
          <TextAreaField
            label={t.myProfile.profilePage.viewPost.label}
            placeholder={t.myProfile.profilePage.viewPost.placeholder}
            value={value}
            onChange={onChangeTextHandler}
            disabled={value.length > 500}
          />
          <Typography variant={'small'} color={'secondary'} className={s.balance}>
            {value.length}/500
          </Typography>
        </div>
      </div>
      <div className={s.saveChangesBlock}>
        <Button variant={'primary'} onClick={onSaveHandler}>
          {t.myProfile.profilePage.viewPost.saveChanges}
        </Button>
      </div>
    </div>
  )
}
