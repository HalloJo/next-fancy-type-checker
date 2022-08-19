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
      </Head>

      <main className={styles.main}>
        <Logo ref={logoRef} />
      </main>
    </div>
  )
}

export default Home
