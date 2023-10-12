import { FC, useLayoutEffect, useState } from 'react'

// eslint-disable-next-line import/order
import Link from 'next/link'

import './DatePicker.scss'
import DatePickerInstance from 'react-datepicker'
import { Control, Controller, FieldError } from 'react-hook-form'

import calendarDefault from '../icons/calendar/calendar-default.svg'
import calendarError from '../icons/calendar/calendar-error.svg'

import s from './DatePicker.module.scss'
import { DatePickerHeader } from './DatePickerHeader'

import { customizeDatePickerInput } from '@/shared/utils/customizeDatePickerInput'

type DatePickerProps = {
  control: Control<any>
  name: string
  error?: FieldError
  title?: string
  range?: boolean
  max?: boolean
  width?: number
}

type Value = Date | null
type RangeValue = [Value, Value]

export const DatePicker: FC<DatePickerProps> = ({
  max,
  width,
  range,
  error,
  control,
  name,
  title,
}) => {
  const [startDate, setStartDate] = useState<Value>(null)
  const [endDate, setEndDate] = useState<Value>(null)

  useLayoutEffect(() => {
    customizeDatePickerInput({
      calendarDefault,
      calendarError,
      max,
      width,
      error,
      name,
    })
  }, [max, width, error, name])

  const placeholderText = range ? 'mm.dd.yyyy - mm.dd.yyyy' : 'mm.dd.yyyy'

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur } }) => {
        const handleChange = (value: Value | RangeValue) => {
          if (value instanceof Array) {
            const [start, end] = value

            setStartDate(start)
            setEndDate(end)
          } else {
            setStartDate(value)
          }

          onChange(value)
        }

        const birthdayError = (
          <>
            {error?.message}.{' '}
            <Link className={s.birthdayErrorLink} href="#" target="_blank">
              privacy-policy
            </Link>
          </>
        )

        return (
          <div className={s.datePickerField}>
            <label htmlFor={name} className={s.label}>
              {title}
            </label>
            <DatePickerInstance
              renderCustomHeader={params => <DatePickerHeader {...params} />}
              selected={startDate}
              onChange={handleChange}
              onBlur={onBlur}
              selectsRange={range}
              startDate={range ? startDate : undefined}
              endDate={range ? endDate : undefined}
              placeholderText={placeholderText}
            />
            {error && (
              <span className={s.datePickerError}>
                {error.type == 'too_big' ? birthdayError : error.message}
              </span>
            )}
          </div>
        )
      }}
    />
  )
}
