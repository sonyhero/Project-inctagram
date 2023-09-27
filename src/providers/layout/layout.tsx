import { PropsWithChildren, ReactElement } from 'react'

import { NextPage } from 'next'

import s from './layout.module.scss'

import { HeadMeta } from '@/shared/ui/head-meta'
import { Header } from '@/widgets/header'
import { SideBar } from 'src/widgets/side-bar'

export const Layout: NextPage<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <HeadMeta title={'NextJS Inctagram'} />
      <Header />
      <div className={s.container}>
        <SideBar />
        <main>{children}</main>
      </div>
    </>
  )
}

export const getBaseLayout = (page: ReactElement) => {
  return <Layout>{page}</Layout>
}
