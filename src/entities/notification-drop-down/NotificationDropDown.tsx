import { useEffect, useState } from 'react'

import s from './NotificationDropDown.module.scss'

import { selectNotifications, useMarkNotificationAsReadMutation } from '@/features/notifications'
import { useAppSelector } from '@/shared/store'
import { Bell, Typography } from '@/shared/ui'
import { DropDownMenu } from '@/shared/ui/drop-down-menu'
import { formatRelativeTime } from '@/shared/utils'

export const NotificationDropDown = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false)
  const notifications = useAppSelector(selectNotifications)
  const [markNotificationsAsRead] = useMarkNotificationAsReadMutation()

  const dropDownItems = [
    {
      id: 1,
      component: (
        <Typography color={'primary'} variant={'regular16'}>
          Уведомления
        </Typography>
      ),
    },
    {
      id: 2,
      component: (
        <div className={s.notifyContent}>
          {notifications.map(notification => {
            const dateToString = notification.notifyAt.toString()

            //TODO: спросить Лёни какое время приходит с бека

            return (
              <Typography
                className={s.notifyText}
                key={notification.id}
                color={'primary'}
                variant={'regular14'}
              >
                {notification.message}
                <br />
                {formatRelativeTime(dateToString)}
              </Typography>
            )
          })}
        </div>
      ),
    },
  ]

  const unreadNotificationIds = notifications
    .filter(notification => !notification.isRead)
    .map(notification => notification.id)

  useEffect(() => {
    if (isDropDownOpen && unreadNotificationIds.length > 0) {
      markNotificationsAsRead({ ids: unreadNotificationIds })
    }
  }, [isDropDownOpen])

  return (
    <DropDownMenu
      className={s.dropDownMenu}
      open={isDropDownOpen}
      setOpen={setIsDropDownOpen}
      align={'end'}
      trigger={
        <div className={s.bellWrapper}>
          <Bell />
          {unreadNotificationIds.length > 0 && (
            <div className={s.count}>
              <Typography variant={'small'}>{unreadNotificationIds.length}</Typography>
            </div>
          )}
        </div>
      }
      items={dropDownItems}
    />
  )
}
