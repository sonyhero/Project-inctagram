export function formatDate(date: Date): string {
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const day = date.getDate().toString().padStart(2, '0')
  const year = date.getFullYear()

  return `${month}.${day}.${year}`
}

export const getDayMonthTime = (dateString: string, locale: string, showTime: boolean = false) => {
  const date = new Date(dateString)
  const options = {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  } as const

  const withTimeOptions = {
    ...options,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  } as const

  return date.toLocaleDateString(locale, showTime ? withTimeOptions : options)
}

export const getNumericDayMonthTime = (
  dateString: string,
  locale: string,
  addDay: boolean = false
) => {
  const date = new Date(dateString)

  if (addDay) {
    date.setDate(date.getDate() + 1)
  }
  const options = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
  } as const

  return date.toLocaleDateString(locale, options)
}

export const formatRelativeTime = (messageTime: string): string => {
  const now = new Date()
  const messageDate = new Date(messageTime)
  const diffInSeconds: number = Math.floor((now.getTime() - messageDate.getTime()) / 1000)
  const diffInMinutes: number = Math.floor(diffInSeconds / 60)
  const diffInHours: number = Math.floor(diffInMinutes / 60)
  const diffInDays: number = Math.floor(diffInHours / 24)

  let timeString

  if (diffInSeconds < 60) {
    timeString = 'Now'
  } else if (diffInMinutes < 60) {
    timeString = `${diffInMinutes} min ago`
  } else if (diffInHours < 24) {
    timeString = `${diffInHours}h ago`
  } else if (diffInDays < 7) {
    const days: number = messageDate.getDay()

    timeString = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][
      days
    ]
  } else if (diffInDays >= 7 && diffInDays < 365) {
    // More than a week ago but within this year
    const day = messageDate.getDate()
    const month = messageDate.getMonth()

    timeString = `${day} ${
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][month]
    }`
  } else {
    // More than a year ago or in the future
    const day = messageDate.getDate()
    const month = messageDate.getMonth()
    const year = messageDate.getFullYear()

    timeString = `${day} ${
      [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ][month]
    } ${year}`
  }

  return timeString
}
