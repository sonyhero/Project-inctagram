import { useEffect, useMemo } from 'react'

import { useRouter } from 'next/router'

import s from './SettingsSwitcher.module.scss'

import { useTranslation } from '@/shared/hooks'
import { useAppDispatch, useAppSelector } from '@/shared/store'
import { TabSwitcher } from '@/shared/ui'
import { setCurrentOption } from '@/widgets/profile-settings'

export const SettingsSwitcher = () => {
  const { t } = useTranslation()
  const { push, asPath } = useRouter()

  const tabSwitcherOptions = useAppSelector(state => state.profileSettingsSlice.tabSwitcherOptions)
  const currentOption = useAppSelector(state => state.profileSettingsSlice.currentOption)
  const dispatch = useAppDispatch()

  const handleTabSort = (value: string) => {
    push(value)
    dispatch(setCurrentOption({ value }))
  }

  const changeOptionTabSwitcher = useMemo(() => {
    return tabSwitcherOptions.map(el => {
      switch (el.id) {
        case 1:
          return { ...el, description: t.myProfile.tabs.generalInformation }
        case 2:
          return { ...el, description: t.myProfile.tabs.devices }
        case 3:
          return { ...el, description: t.myProfile.tabs.accountManagement }
        case 4:
          return { ...el, description: t.myProfile.tabs.myPayments }
      }

      return el
    })
  }, [tabSwitcherOptions, t])

  useEffect(() => {
    dispatch(setCurrentOption({ value: asPath }))
  }, [])

  return (
    <div className={s.tabSwitcher}>
      <TabSwitcher
        options={changeOptionTabSwitcher}
        onChangeCallback={handleTabSort}
        activeTab={currentOption}
      />
    </div>
  )
}
