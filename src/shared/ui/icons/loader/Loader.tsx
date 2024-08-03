import React from 'react'

import Image from 'next/image'

import loader from 'public/loader.svg'

type Props = {
  width?: number
  height?: number
  className?: string
}

export const Loader = (props: Props) => {
  const { className, width = 48, height = 48 } = props

  return <Image src={loader} width={width} height={height} className={className} alt={'loading'} />
}
