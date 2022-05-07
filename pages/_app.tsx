import type { AppProps } from 'next/app';
import { ThirdwebProvider, ChainId } from '@thirdweb-dev/react';
import 'tailwindcss/tailwind.css';
import '@fontsource/montserrat/700.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/700.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThirdwebProvider
      desiredChainId={ChainId.Mumbai}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
