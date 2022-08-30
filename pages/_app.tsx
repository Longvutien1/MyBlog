import '../styles/globals.css'
import type { AppProps } from 'next/app'
// import { store } from './app/store'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { AppPropsWithLayout } from './models/Layout'
import LayoutClient from '../component/Layout'
import { SWRConfig } from 'swr'
import axios from 'axios'
function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const LayoutWapper = Component.Layout ?? LayoutClient
  return (<LayoutWapper>
    <SWRConfig value={{
      fetcher: async (url:string) => axios.get(url),
    }}>
    <Provider store={store}> <Component {...pageProps} /></Provider>
    </SWRConfig>
  </LayoutWapper>)
}

export default MyApp
