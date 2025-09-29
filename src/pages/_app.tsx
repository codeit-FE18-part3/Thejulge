import { Container, Header, Wrapper } from '@/components/layout';
import '@/styles/fonts.css';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>thejulge</title>
        <link rel='icon' href='/favicon.ico' sizes='any' />
        <link rel='icon' href='/favicon.png' type='image/png' sizes='192x192' />
      </Head>
      <Wrapper>
        <Header />
        <Container grow={true}>
          <Component {...pageProps} />
        </Container>
      </Wrapper>
    </>
  );
}
