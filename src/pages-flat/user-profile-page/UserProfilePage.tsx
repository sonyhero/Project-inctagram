import React from 'react'

import s from './UserProfilePage.module.scss'

import { Posts } from '@/entities/posts/ui/Posts'
import { ProfileHeader } from '@/widgets/profile-header'

export const UserProfilePage = () => {
  const scrollableID = 'scrollableID'

  return (
    <div id={scrollableID} className={s.userProfile}>
      <ProfileHeader />
      <Posts scrollableID={scrollableID} />
    </div>
  )
}
