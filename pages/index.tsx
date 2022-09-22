import type { NextPage } from 'next'
import Head from 'next/head'
import {gsap, Back} from 'gsap';
import { useEffect, useRef, useState} from 'react';
import Logo from '../components/Logo/Logo'
import styles from '../styles/Home.module.scss'
import { useTransitionController } from '../transition-component/hooks/useTransitionController';
import { useEnterTransition } from '../transition-component/hooks/useEnterTransition';
import { setupTransitionInTimeline } from './index.transitions';
import Output from '../components/Output/Output';

const Home: NextPage = () => {

  const [output, setOutput] = useState("The quick brown fox jumps over the lazy dog")

  return (
    <div className={styles.container}>
      <Head>
        <title>The Next Fancy Type Checker!</title>
        <meta name="description" content="A personal project where you can animate your text to see what is fancy pancy!" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      </Head>

      <main className={styles.main}>
        <Logo />
        <Output output={output} />
      </main>
    </div>
  )
}

export default Home
