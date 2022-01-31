import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@3rdweb/react';
import 'tailwindcss/tailwind.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ThirdwebProvider
      connectors={{ injected: {} }}
      supportedChainIds={[137, 80001]}
    >
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
};

export default MyApp;
