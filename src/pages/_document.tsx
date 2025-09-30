import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ko'>
      <Head />
      <body className='antialiased'>
        <Main />
        <div id='toast-root'></div>
        <NextScript />
      </body>
    </Html>
  );
}
