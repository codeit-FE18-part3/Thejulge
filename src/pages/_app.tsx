import { Container, Header, Wrapper } from '@/components/layout';
import ToastProvider from '@/context/toastContext/toastContext';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import Test from './test';

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
        <Container as='main' grow>
          {page}
        </Container>
      </Wrapper>
    ));

  return (
    <>
      <Head>
        <title>thejulge</title>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.png' type='image/png' sizes='192x192' />
      </Head>
      <ToastProvider>
        {getLayout(<Component {...pageProps} />)}
        <Test />
      </ToastProvider>
    </>
  );
}
