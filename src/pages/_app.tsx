import { Footer, Header, Wrapper } from '@/components/layout';
import AppProvider from '@/context/appProvider';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactNode) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & { Component: NextPageWithLayout };

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout =
    Component.getLayout ??
    (page => (
      <Wrapper>
        <Header />
        <main className='relative z-[1] flex grow flex-col'>{page}</main>
        <Footer />
      </Wrapper>
    ));

  return (
    <>
      <Head>
        <title>일일 알바 매칭 플랫폼 | The-julge</title>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.png' type='image/png' sizes='192x192' />
      </Head>
      <AppProvider>{getLayout(<Component {...pageProps} />)}</AppProvider>
    </>
  );
}
