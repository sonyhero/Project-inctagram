import { ReactNode, useState } from 'react'

import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { motion } from 'framer-motion'

import s from './DropDownMenu.module.scss'

type Props = {
  trigger?: ReactNode
  items?: {
    id: number
    component: JSX.Element
  }[]
}

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
}
const motionItem = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export const DropDownMenu = ({ items, trigger }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const itemsForRender = items?.map((item, index) => {
    return (
      <div key={index}>
        {index === items?.length - 1 ? (
          <motion.div variants={motionItem}>
            <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
          </motion.div>
        ) : (
          <>
            <motion.div variants={motionItem}>
              <DropdownMenu.Item className={s.dropdownMenuItem}>{item.component}</DropdownMenu.Item>
              <DropdownMenu.Separator className={s.dropdownMenuSeparator} />
            </motion.div>
          </>
        )}
      </div>
    )
  })

  const onCloseHandler = () => {
    setIsOpen(false)
  }

  const onOpenHandler = () => {
    setIsOpen(true)
  }

  return (
    <DropdownMenu.Root open={isOpen}>
      <DropdownMenu.Trigger onClick={onOpenHandler} asChild>
        <button className={s.iconButton} aria-label="Customise options">
          {trigger}
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          onInteractOutside={onCloseHandler}
          align={'end'}
          className={s.dropdownMenuContent}
          sideOffset={5}
        >
          <motion.div variants={container} initial="hidden" animate="visible">
            {itemsForRender}
          </motion.div>
          <DropdownMenu.Arrow className={s.arrowBox} asChild>
            <div className={s.arrow} />
          </DropdownMenu.Arrow>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}
