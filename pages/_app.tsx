import type { AppProps } from 'next/app'
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react'

import 'inter-ui'
import 'tailwindcss/tailwind.css'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThirdwebProvider desiredChainId={ChainId.Mumbai}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp
