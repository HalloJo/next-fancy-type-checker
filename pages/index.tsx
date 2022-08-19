import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>The Next Fancy Type Checker!</title>
        <meta name="description" content="A personal project where you can animate your text to see what is fancy pancy!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          The Next Fancy Type Checker!
        </h1>
      </main>
    </div>
  )
}

export default Home
