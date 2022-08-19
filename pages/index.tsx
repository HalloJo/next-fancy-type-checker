import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRef } from 'react'
import Logo from '../components/Logo/Logo'
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {

  const logoRef = useRef(null)

  return (
    <div className={styles.container}>
      <Head>
        <title>The Next Fancy Type Checker!</title>
        <meta name="description" content="A personal project where you can animate your text to see what is fancy pancy!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>

      <main className={styles.main}>
        <Logo ref={logoRef} />
      </main>
    </div>
  )
}

export default Home
