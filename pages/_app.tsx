import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { TransitionPresence } from '../transition-component/components/TransitionPresence'

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <TransitionPresence>
      <Component {...pageProps} />
    </TransitionPresence>
    
  ) 
}

export default MyApp
