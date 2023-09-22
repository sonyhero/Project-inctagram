import { FC } from 'react'

import * as Checkbox from '@radix-ui/react-checkbox'
// import { CheckIcon } from '@radix-ui/react-icons'

import s from './check-box.module.scss'

import { CheckIcon } from '@/shared/ui/icons/check-icon/check-icon'
import { Typography } from '@/shared/ui/typography'

export type CheckBoxProps = {
  onChange?: (checked: boolean) => void
  disabled?: boolean
  checked?: boolean
  label?: string
}

export const CheckBox: FC<CheckBoxProps> = ({ disabled = false, onChange, checked, label }) => {
  return (
    <Typography
      className={s.label}
      variant={'regular14'}
      as={'label'}
      color={disabled ? 'disabled' : 'primary'}
    >
      <Checkbox.Root
        className={`${s.checkboxRoot} ${checked ? s.active : s.unActive}`}
        checked={checked}
        onCheckedChange={onChange}
        disabled={disabled}
      >
        <Checkbox.Indicator className={s.checkboxIndicator}>
          <CheckIcon fill={disabled ? '#4c4c4c' : '#edf3fa'} />
        </Checkbox.Indicator>
      </Checkbox.Root>
      {label}
    </Typography>
  )
}