import './globals.scss';
import type { AppProps } from 'next/app'
 
export default function MyApp({ Component, pageProps }: AppProps) {
  console.log('helo from_app')
  return <Component {...pageProps} />
}