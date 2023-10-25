import React from 'react'

import Image from 'next/image'

import s from './Profile.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { useTranslation } from '@/shared/hooks'
import { useAppDispatch } from '@/shared/store'
import { Button, Typography } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'
import person from 'public/person.svg'

type Props = {
  userId: number
}
export const Profile = ({ userId }: Props) => {
  const { t } = useTranslation()
  const { data } = useGetProfileQuery(userId)
  const dispatch = useAppDispatch()

  const showProfileSettingsHandler = () => {
    dispatch(profileSettingsSlice.actions.setShowProfileSettings({ value: true }))
  }

  // const profileAvatarLoader = () => {
  //   return data?.avatars.length ? data.avatars[0].url : ''
  // }

  const profileAvatarLoader = () => {
    return data?.avatars.length
      ? {
          src: person,
          loader: () => data.avatars[0].url,
        }
      : {
          src: person,
        }
  }

  return (
    <div className={s.profileBlock}>
      <div className={s.mainInfo}>
        <div className={s.photoBlock}>
          <Image {...profileAvatarLoader()} alt={'profilePhoto'} className={s.photo} />
          {/*{data?.avatars.length ? (*/}
          {/*  <img src={data.avatars[0].url} className={s.photo} alt="profilePhoto" />*/}
          {/*) : (*/}
          {/*  <div className={s.defaultPhoto}>*/}
          {/*    <ImageIcon height={48} width={48} />*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
        <div className={s.descriptionBlock}>
          <div className={s.nameAndSettings}>
            <Typography variant={'h1'}>{data?.userName}</Typography>
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
              <Typography variant={'bold14'}>0</Typography>
              <Typography variant={'regular14'}>{t.myProfile.profilePage.publications}</Typography>
            </div>
          </div>
          <div className={s.aboutMe}>
            <Typography variant={'regular16'}>{data?.aboutMe}</Typography>
          </div>
        </div>
      </div>
      <div>
        <Typography variant={'h3'}>Тут будут посты</Typography>
      </div>
    </div>
  )
}
