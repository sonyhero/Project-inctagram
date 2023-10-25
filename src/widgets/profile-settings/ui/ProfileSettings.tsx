import { useEffect, useMemo, useState } from 'react'

import Image from 'next/image'
import { useRouter } from 'next/router'

import person from '../../../../public/person.svg'

import s from './ProfileSettings.module.scss'

import { useGetProfileQuery } from '@/entities/profile'
import { AddPhotoModal, DeletePhotoModal } from '@/features/modal'
import { UpdateProfileForm } from '@/features/update-profile-form'
import { useTranslation } from '@/shared/hooks/useTranstaion'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { Button, Close, ImageIcon, TabSwitcher } from '@/shared/ui'
import { profileSettingsSlice } from '@/widgets/profile-settings'

type Props = {
  userId: number
}
export const ProfileSettings = ({ userId }: Props) => {
  const { data: profileData } = useGetProfileQuery(userId)
  const { t } = useTranslation()
  const { locale } = useRouter()

  const tabSwitcherOptions = useAppSelector(state => state.profileSettingsSlice.tabSwitcherOptions)
  const currentOption = useAppSelector(state => state.profileSettingsSlice.currentOption)
  const dispatch = useAppDispatch()

  const [deletePhotoModal, setDeleteModalPhoto] = useState<boolean>(false)
  const [addPhotoModal, setAddPhotoModal] = useState<boolean>(false)

  const handleTabSort = (value: string) => {
    dispatch(profileSettingsSlice.actions.setCurrentOption({ value }))
  }
  const openPhotoModal = () => {
    setAddPhotoModal(true)
  }
  const openDeleteModalHandler = () => {
    setDeleteModalPhoto(true)
  }

  const profileAvatarLoader = () => {
    return profileData
      ? {
          src: person,
          loader: () => profileData.avatars[0].url,
        }
      : {
          src: person,
        }
  }

  const showActivePage = useMemo(() => {
    if (currentOption === t.myProfile.tabs.generalInformation) {
      return (
        <div className={s.profileSettings}>
          <div className={s.photoBlock}>
            {profileData?.avatars.length ? (
              <div className={s.photoAndDeleteBlock}>
                <Image {...profileAvatarLoader()} alt={'profilePhoto'} className={s.photo} />
                <div className={s.deletePhoto} onClick={openDeleteModalHandler}>
                  <Close />
                </div>
              </div>
            ) : (
              <div className={s.defaultPhoto}>
                <ImageIcon height={48} width={48} />
              </div>
            )}
            <Button variant={'outline'} onClick={openPhotoModal}>
              {t.myProfile.generalInformation.addAProfilePhoto}
            </Button>
          </div>
          {profileData ? <UpdateProfileForm defaultValue={profileData} /> : <div>Loading</div>}
        </div>
      )
    } else if (currentOption === t.myProfile.tabs.devices) {
      return <div>{t.myProfile.tabs.devices}</div>
    } else if (currentOption === t.myProfile.tabs.accountManagement) {
      return <div>{t.myProfile.tabs.accountManagement}</div>
    } else if (currentOption === t.myProfile.tabs.myPayments) {
      return <div>{t.myProfile.tabs.myPayments}</div>
    }
  }, [currentOption, profileData])

  const changeOptionTabSwitcher = useMemo(() => {
    return tabSwitcherOptions.map(el => {
      if (el.id === 1) {
        return { ...el, value: t.myProfile.tabs.generalInformation }
      }
      if (el.id === 2) {
        return { ...el, value: t.myProfile.tabs.devices }
      }
      if (el.id === 3) {
        return { ...el, value: t.myProfile.tabs.accountManagement }
      }
      if (el.id === 4) {
        return { ...el, value: t.myProfile.tabs.myPayments }
      }

      return el
    })
  }, [tabSwitcherOptions, t])

  useEffect(() => {
    dispatch(
      profileSettingsSlice.actions.setCurrentOption({
        value: t.myProfile.tabs.generalInformation,
      })
    )
  }, [locale])

  return (
    <div className={s.profileBlock}>
      <div className={s.tabSwitcher}>
        <TabSwitcher
          options={changeOptionTabSwitcher}
          onChangeCallback={value => handleTabSort(value)}
          activeTab={currentOption}
        />
      </div>
      {showActivePage}
      <AddPhotoModal addPhotoModal={addPhotoModal} setAddPhotoModal={setAddPhotoModal} />
      <DeletePhotoModal
        deletePhotoModal={deletePhotoModal}
        setDeleteModalPhoto={setDeleteModalPhoto}
      />
    </div>
  )
}
